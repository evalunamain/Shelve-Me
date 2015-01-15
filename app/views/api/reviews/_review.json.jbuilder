json.extract! review, :id, :user_id, :book_id, :content, :created_at, :updated_at

json.author do
  json.partial! 'api/users/user', user: review.author
end
