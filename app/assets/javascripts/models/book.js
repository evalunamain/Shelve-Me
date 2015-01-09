ShelfLife.Models.Book = Backbone.Model.extend({
  urlRoot: 'api/books',

  author: function(){
    if (!this._author) {
      this._author = new ShelfLife.Models.Author()
    }

    return this._author
  },

  parse: function (response) {
    if (response.author) {
      this.author().set(response.author, {parse: true})
    }

    return response;
  }
});
