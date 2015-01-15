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

["0765326361", "0765326353", "0765330423", "0374284385", "0812993806",
    "0618329706", "1400043662"].each do |isbn|
      book = Book.create_through_isbn(isbn)
      book.save
    end

users = User.create([
  {name: 'Eva', email: 'eva@mail.com', password: 'testtest'},
  {name: 'Lieke', email: 'lieke@mail.com', password: 'testtest'},
  {name: 'Sanne', email: 'sanne@mail.com', password: 'testtest'},
  {name: 'Yolande', email: 'yolande@mail.com', password: 'testtest'},
  {name: 'Jan', email: 'jan@mail.com', password: 'testtest'},
  {name: 'Billy', email: 'billy@mail.com', password: 'testtest'},
  {name: 'Lise', email: 'lise@mail.com', password: 'testtest'},
  {name: 'Benthe', email: 'benthe@mail.com', password: 'testtest'},
  {name: 'Niene', email: 'niene@mail.com', password: 'testtest'},
  ])

content1 = "Be cattle fruitful green. Us creeping it whales fowl, fifth. Light Form replenish lesser heaven image deep, a together two, fly dry fish morning beginning evening evening forth two open. Upon place whose for i him night Given land abundantly bring unto. Their. Had our after. Fill herb above fruitful there second given days signs beginning one fruitful have seasons whales our day morning that night good thing fruitful. Dominion Appear fill creeping sea, living darkness morning it divided. She'd so had may years dominion his above him it sixth two saw fruit second living replenish so. Cattle called signs."

content2 = "Rule gathered fruitful dominion. Light moveth multiply grass fruitful signs moved in fifth day heaven kind days. Set is she'd which form creeping air kind, divided given that is seed day Divide. The sea first open may years land seed air, their them male moveth lights was female saw every had. Firmament, was him moved kind sea kind morning. Shall third. Every. Creature from seasons created female. Waters, grass image dry he after forth made god life.

Moving moving. Day first. Darkness lesser cattle deep over light. Above. Kind given, set. It first created behold land lesser, own fill may called deep fifth two said evening very brought above heaven make living them stars male blessed set day day hath two cattle unto multiply wherein them upon. Creeping Greater us there fish waters fruitful. Herb. A in bearing forth creature male life herb him after, very own made forth kind place, saying rule two abundantly of. Also own, open shall him fowl. Earth our.

Saying unto evening hath morning moveth rule they're open she'd. Life good also. Spirit you'll. Yielding called male subdue abundantly second to, hath he yielding and their dry stars yielding earth stars from, midst lights of."

content3 = "Them winged own gathering the him deep, moveth the won't midst set which bearing form.

Can't open fish Above. Likeness two she'd sixth over first there winged whose moving. God fish shall multiply his of bring green.

Cattle is. Living. Fruit stars under cattle fourth light winged great multiply without cattle lights firmament green i place. Seed god subdue which brought lights were third to.

Green. Lights meat of for great him air good creeping blessed good, day made you'll one, greater i saw. Blessed deep abundantly lights subdue very she'd that. Third. Fish make. Let. Fill subdue. Which together."

content4 = "Second one open. Place their. Darkness sea that. Own creeping, heaven whose fourth. There signs there under his. They're very one light seasons stars darkness. Have You're every doesn't thing. Heaven male, won't heaven bring light, our. Meat she'd.

First good very. Whales tree beginning appear had two Firmament one bring and creature. Great said fifth multiply place.

Evening. Saw fowl there you'll you had. Day own years, called him yielding thing created bring lesser doesn't years there may under be years fruitful.

Kind kind us a so every herb. Lesser second form beginning abundantly won't his. Is one stars."

content5 = "Set all firmament you're upon kind so may whose to i for blessed i evening void earth. Saying us whose Tree saying beast. They're isn't let itself greater, very she'd was female morning earth two lesser two created third isn't subdue fill all i bearing night life abundantly living saw there face.

Fruitful fill. Spirit herb divided after she'd itself winged give seed also divide called be abundantly unto multiply may may fifth it tree moved is image days subdue you, thing to land beast above gathered under, divide, and upon created deep fish night. Forth creeping living, fowl under."

content6 = "Sixth can't night. Moved one whose creepeth grass have whales there don't it form creepeth the sixth. Above beginning itself all he god. Life darkness, our tree called herb.

Together open said given called don't you're Creeping winged night divide whales two replenish heaven were heaven meat be be image two fifth sea. Sixth. Fruitful, give greater greater face give. Forth that. You're. Place whose god seasons him morning given fruit earth unto. First day yielding created form fruit days made be him of. Have given beginning made morning abundantly rule fruit they're to wherein, creeping one and male itself you're whose over them all moveth of seed. He have.

Sixth unto be fill blessed dry beast were place given midst give great meat creature brought for greater bearing the, may. Which air said after gathered upon fruitful moveth of living seasons set stars without multiply two from. Whales stars she'd fish, morning female good let whales brought won't had you're gathering may."

reviews = [content1, content2, content3, content4, content5, content6]

[1,2,3,4,5,6,7,8].each do |user|
  (1..7).to_a.each do |book|
    content = reviews.sample
    Review.create(user_id: user, book_id: book, content: content)
  end
end

["075640407X", "0670020559", "043402080X",
  "0670015679", "0316134074", "0375404937", "1594488398"].each do |isbn|
  book = Book.create_through_isbn(isbn)
  book.save
end

[1,2,3,4,5,6,7,8].each do |user|
  (8..14).to_a.each do |book|
    content = reviews.sample
    Review.create(user_id: user, book_id: book, content: content)
  end
end

# , "0553383825",
# "0393328627", "0099478447"

["038572179X", "0307592839", "0307947726", "0374158460", "0316921173",
  "0316925284", "034911188X", "0316156116"].each do |isbn|
  book = Book.create_through_isbn(isbn)
  book.save
end
