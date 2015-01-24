json.extract! current_user, :id, :name, :email

json.books current_user.books do |book|
  json.extract! book,  :id, :title, :cover, :isbn, :created_at, :updated_at, :author_id, :description

  json.author book.author
end

json.shelves current_user.shelves do |shelf|
  json.extract! shelf, :id, :title
  json.books shelf.books
end

json.ratings current_user.ratings

json.reviews current_user.reviews

json.friends current_user.friends do |friend|
  json.extract! friend, :id, :name, :email
end

json.accepted_friends current_user.accepted_friends, partial: 'api/users/user', as: :user

json.friendships current_user.friendships do |friendship|
  json.extract! friendship, :id, :friend_id, :user_id
  json.friend friendship.friend, :id, :name, :email
end

json.accepted_friendships current_user.accepted_friendships do |friendship|
  json.extract! friendship, :id, :friend_id, :user_id
  json.friend friendship.friend, :id, :name, :email
end

json.pending_friendships current_user.pending_friendships do |friendship|
  json.extract! friendship, :id, :friend_id, :user_id
  json.friend friendship.friend, :id, :name, :email
end

json.friendship_requests current_user.friendship_requests do |friendship|
  json.extract! friendship, :id, :friend_id, :user_id
  json.friend friendship.friend, :id, :name, :email
end
