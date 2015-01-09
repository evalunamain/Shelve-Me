# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

["0765326361", "0765326353", "0765330423", "0374284385", "0812993806", "0618329706", "1400043662", "075640407X"].each do |isbn|
  book = Book.create_through_isbn(isbn)
  book.save
end
