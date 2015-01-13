json.extract! @shelf, :id, :title, :user_id

json.books @shelf.books

json.user do
  json.id @shelf.user.id
  json.name @shelf.user.name
  json.shelves @shelf.user.shelves
end
