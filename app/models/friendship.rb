class Friendship < ActiveRecord::Base
  validates :user_id, :friend_id, presence: true
  # validates :activation_token, uniqueness: true

  belongs_to :user
  belongs_to :friend, class_name: "User", foreign_key: :friend_id

  scope :accepted, -> {where(:accepted => true) }

  scope :pending, -> {where(activation_token: nil).where(:accepted => false)}

  scope :requested, -> {where.not(activation_token: nil).where(:accepted => false)}

  def activate(token)
    # TODO: Use BCrypt
    if self.activation_token == token
      inverse_friendship = Friendship.find_by(user_id: self.friend_id, friend_id: self.user_id)

      transaction do
        inverse_friendship.accepted = true
        inverse_friendship.save
        self.activation_token = nil
        self.accepted = true
        self.save
      end
    end
  end
  
  def set_activation_token
    self.activation_token ||= SecureRandom.urlsafe_base64(16)
  end
end
