class Book < ActiveRecord::Base
  validates :title, :author_id, :description, :isbn, presence: true
  # validates :isbn, message: "Must be a valid ISBN10"

  belongs_to :author
  has_many :shelved_books, dependent: :destroy
  has_many :shelves, through: :shelved_books
  has_many :ratings, dependent: :destroy
  has_many :reviews, dependent: :destroy

  # https://github.com/phoet/asin
  def self.find_by_isbn(isbn)
    # start with new book object.
    book = Book.find_by(isbn: isbn)
    book ? book : self.create_through_isbn(isbn)
  end

  def self.create_through_isbn(isbn)
    client = ASIN::Client.instance
    items = client.lookup(isbn)
    if (items.empty?)
      return Book.new
    end

    title = items.first.item_attributes.title
    isbn = items.first.item_attributes.isbn
    description = find_description(items)
    cover = find_cover(items);
    author = find_author(items);

    book = Book.new({
      title: title,
      isbn: isbn,
      authorname: author,
      description: description,
      cover: cover
    })
  end

  def authorname=(authorname)
    author = Author.find_by(name: authorname)

    if author.nil?
      author = Author.new(name: authorname)
      author.save
    end

    self.author_id = author.id
  end

  def average_rating
    if self.ratings.count == 0
      return
    end
    rating = self.ratings.average(:rating).to_f
    rating = rating * 2.0
    (rating.round) / 2.0
  end

  def self.find_cover(items)
    if items.first.medium_image
      return items.first.medium_image.url
    elsif items.first.image_sets
      return items.first.image_sets.image_set.medium_image.url
    end
  end

  def self.find_author(items)
    author = items.first.item_attributes.author
    if author.class == Array
      return items.first.item_attributes.author.first
    else
      return author
    end
  end

  def self.find_description(items)
    description = items.first.editorial_reviews.editorial_review
    if description.class == Array
      description = items.first.editorial_reviews.editorial_review.first.content
    else
      description = items.first.editorial_reviews.editorial_review.content
    end
    self.remove_html_tags(description)
  end

  def self.remove_html_tags(description)
    tags = /<("[^"]*"|'[^']*'|[^'">])*>/
    mid_whitespace = /\s{2,}/
    start_whitespace = /^\s/
    description = description.gsub(tags, ' ')
    description = description.gsub(mid_whitespace, ' ')
    description = description.gsub(start_whitespace, '')
  end

end
