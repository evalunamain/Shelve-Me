json.extract! @user, :id, :name, :email

json.friends @user.friends, :id, :name, :email

json.pending_friends @user.pending_friends, :id, :name, :email

json.accepted_friends @user.accepted_friends, :id, :name, :email

json.requesting_friends @user.requesting_friends, :id, :name, :email

json.friendships @user.friendships do |friendship|
	json.extract! friendship, :id, :friend_id, :user_id 
	json.friend friendship.friend, :id, :name, :email
end

json.accepted_friendships @user.accepted_friendships, :id, :friend_id, :user_id

json.pending_friendships @user.pending_friendships, :id, :friend_id, :user_id

json.friendship_requests @user.friendship_requests, :id, :friend_id, :user_id


json.books @user.books do |book|
	json.extract! book,  :id, :title, :cover, :isbn, :created_at, :updated_at, :author_id, :description

	json.author book.author
end