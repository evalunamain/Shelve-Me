ShelfLife.Collections.Books = Backbone.Collection.extend({
  url: 'api/books',

  model: ShelfLife.Models.Book,

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
  }

});

ShelfLife.Collections.books = new ShelfLife.Collections.Books
