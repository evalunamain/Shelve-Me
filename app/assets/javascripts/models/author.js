ShelveMe.Models.Author = Backbone.Model.extend({
  urlRoot: "api/authors",

  books: function () {
    if (!this._books) {
      this._books = new ShelveMe.Collections.Books()
    }

    return this._books;
  },

  parse: function (response) {
    if (response.books) {
      this.books().set(response.books, {parse: true});
      delete response.books
    }

    return response;
  }
});
