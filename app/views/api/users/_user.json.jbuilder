json.id user.id
json.name user.name
json.email user.email
json.favorite_book user.favorite_book
json.books user.books, partial: 'api/books/book', as: :book
json.ratings user.ratings
json.reviews user.reviews, partial: 'api/reviews/review', as: :review
