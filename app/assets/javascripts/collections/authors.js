ShelveMe.Collections.Authors = Backbone.Collection.extend({
  url: 'api/authors',

  model: ShelveMe.Models.Author,

  comparator: "title",

  getOrFetch: function (id){
    var author = this.get(id);
    var authors = this;

    if (!author) {
      author = new ShelveMe.Models.Author({id: id});
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

ShelveMe.Collections.authors = new ShelveMe.Collections.Authors
