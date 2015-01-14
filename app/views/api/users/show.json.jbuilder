json.extract! @user, :id, :name, :email

json.friends @user.friends, :id, :name, :email

json.friendships @user.friendships do |friendship|
	json.extract! friendship, :id, :friend_id, :user_id
	json.friend friendship.friend, :id, :name, :email
end

json.accepted_friendships @user.accepted_friendships do |friendship|
	json.extract! friendship, :id, :friend_id, :user_id
	json.friend friendship.friend, :id, :name, :email
end

json.pending_friendships @user.pending_friendships do |friendship|
	json.extract! friendship, :id, :friend_id, :user_id
	json.friend friendship.friend, :id, :name, :email
end

json.friendship_requests @user.friendship_requests do |friendship|
	json.extract! friendship, :id, :friend_id, :user_id
	json.friend friendship.friend, :id, :name, :email
end

json.books @user.books do |book|
	json.extract! book,  :id, :title, :cover, :isbn, :created_at, :updated_at, :author_id, :description

	json.author book.author
end

json.ratings @user.ratings

json.shelves @user.shelves do |shelf|
	json.extract! shelf, :id, :title
	json.books shelf.books
end
