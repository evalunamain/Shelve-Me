ShelfLife.Collections.Authors = Backbone.Collection.extend({
  url: 'api/authors',

  model: ShelfLife.Models.Author,

  comparator: "title",

  getOrFetch: function (id){
    var author = this.get(id);
    var authors = this;

    if (!author) {
      author = new ShelfLife.Models.Author({id: id});
      author.fetch({
        success: function (){
          authors.add(author);
        }
      });
    } else {
      author.fetch();
    }

    return author;
  }

});

ShelfLife.Collections.authors = new ShelfLife.Collections.Authors
