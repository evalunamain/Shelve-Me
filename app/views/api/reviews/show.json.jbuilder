json.extract! @review, :id, :user_id, :book_id, :content

json.author do
  json.id @review.author.id
  json.name @review.author.name
end
