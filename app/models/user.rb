class User < ActiveRecord::Base
  validates :password_digest, :session_token, :name, :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password

  after_initialize :ensure_session_token
	before_create :set_standard_shelves

  has_many :shelves
  has_many :shelved_books, through: :shelves
  has_many :books, through: :shelved_books

  has_many :ratings, dependent: :destroy
  has_many :reviews, foreign_key: :user_id, dependent: :destroy

  has_many :friendships, dependent: :destroy
  has_many :friends, through: :friendships

  has_many :accepted_friendships, -> { accepted }, class_name: "Friendship", foreign_key: :user_id
  has_many :accepted_friends, through: :accepted_friendships, source: :friend

  has_many :pending_friendships, -> { pending }, class_name: "Friendship", foreign_key: :user_id
  has_many :pending_friends, through: :pending_friendships, source: :friend

  has_many :friendship_requests, -> { requested }, class_name: "Friendship", foreign_key: :user_id
  has_many :requesting_friends, through: :friendship_requests, source: :friend

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user && user.is_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def is_friend?(user)
    self.friends.exists?(id: user.id)
  end

  # def friendship_requests
  #   friendships.where(accepted: false).where.not(activation_token: nil)
  # end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

	def set_standard_shelves
		["to-read", "currently-reading", "read"].each do |title|
			shelf = self.shelves.new(title: title)
			shelf.save
		end
	end
end
