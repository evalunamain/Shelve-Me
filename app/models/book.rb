class Book < ActiveRecord::Base
  validates :title, :author_id, :isbn, :description, presence: true

  attr_reader :author

  # https://github.com/phoet/asin
  def self.find_by_isbn(isbn)
    book = Book.find_by(isbn: isbn)
    book ? book : self.create_through_isbn(isbn)
  end

  def self.create_through_isbn(isbn)
    client = ASIN::Client.instance
    items = client.lookup(isbn)

    title = items.first.item_attributes.title
    isbn = items.first.item_attributes.isbn
    description = items.first.editorial_reviews.editorial_review.content
    cover = items.first.image_sets.image_set.medium_image.url
    author = items.first.item_attributes.author.first

    book = Book.new({
      title: title,
      isbn: isbn,
      author: author,
      description: description,
      cover: cover
    })
  end

  def author=(author)
    @author = author
    author = Author.find_by(name: @author)

    if author.nil?
      author = Author.new(name: @author)
      author.save
    end

    self.author_id = author.id
  end


end
