ShelfLife.Collections.Books = Backbone.Collection.extend({
  url: 'api/books',

  model: ShelfLife.Models.Book,

  comparator: function (book) {
    var str = book.get("updated_at");
    str = str.toLowerCase();
    str = str.split("");
    str = _.map(str, function(letter) {
      return String.fromCharCode(-(letter.charCodeAt(0)));
    });
    return str;
  },

  getOrFetch: function (id){
    var book = this.get(id);
    var books = this;

    if (!book) {
      book = new ShelfLife.Models.Book({id: id});
      book.fetch({
        success: function (){
          books.add(book);
        }
      });
    } else {
      book.fetch();
    }

    return book;
  },
});

ShelfLife.Collections.books = new ShelfLife.Collections.Books
