class Friendship < ActiveRecord::Base
  validates :user_id, :friend_id, presence: true
  validate :can_not_befriend_self

  belongs_to :user
  belongs_to :friend, class_name: "User", foreign_key: :friend_id

  scope :accepted, -> {where(status: "accepted")}

  scope :pending, -> {where(status: "pending")}

  scope :requested, -> {where(status: "requested")}

  def can_not_befriend_self
    if user_id == friend_id
      errors.add(:friend_id, "can't befriend yourself")
    end
  end

end
