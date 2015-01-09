json.extract! @book, :id, :title, :cover, :isbn, :created_at, :updated_at, :author_id, :description

json.author @book.author
