json.extract! @book, :id, :title, :cover, :isbn, :created_at, :updated_at, :author_id, :description

json.author @book.author

json.rating @book.average_rating

json.shelves @book.shelves

json.ratings @book.ratings

json.reviews @book.reviews, partial: 'api/reviews/review', as: :review
