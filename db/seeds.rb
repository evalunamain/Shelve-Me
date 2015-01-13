# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# ["0765326361", "0765326353", "0765330423", "0374284385", "0812993806",
#   "0618329706", "1400043662", "075640407X", "0670020559", "043402080X",
#   "0670015679", "0316134074", "0375404937", "1594488398", "0553383825",
#   "0393328627", "0099478447", "038572179X", "0307592839", "0307947726",
#   "0374158460", "0316921173", "0316925284", "034911188X", "0316156116"].each do |isbn|
#   book = Book.create_through_isbn(isbn)
#   book.save
# end

["075640407X", "0670020559", "043402080X",
  "0670015679", "0316134074", "0375404937", "1594488398", "0553383825",
  "0393328627", "0099478447"].each do |isbn|
  book = Book.create_through_isbn(isbn)
  book.save
end

users = User.create([
  {name: 'Lieke', email: 'lieke@mail.com', password: 'testtest'},
  {name: 'Sanne', email: 'sanne@mail.com', password: 'testtest'},
  {name: 'Yolande', email: 'yolande@mail.com', password: 'testtest'},
  {name: 'Jan', email: 'jan@mail.com', password: 'testtest'},
  {name: 'Billy', email: 'billy@mail.com', password: 'testtest'},
  {name: 'Lise', email: 'lise@mail.com', password: 'testtest'},
  {name: 'Benthe', email: 'benthe@mail.com', password: 'testtest'},
  {name: 'Niene', email: 'niene@mail.com', password: 'testtest'},
])

["0765326361", "0765326353", "0765330423", "0374284385", "0812993806",
  "0618329706", "1400043662","0316925284", "034911188X"].each do |isbn|
    book = Book.create_through_isbn(isbn)
    book.save
end
