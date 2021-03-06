ShelveMe.Models.Shelf = Backbone.Model.extend({
  urlRoot: "api/shelves",

  books: function () {
    if (!this._books) {
      this._books = new ShelveMe.Collections.Books()
    }

    return this._books;
  },

  user: function () {
    if (!this._user) {
      this._user = new ShelveMe.Models.User()
    }

    return this._user;
  },

  parse: function (response) {
    if (response.books) {
      this.books().set(response.books, {parse: true});
			delete response.books
    }

    if (response.user) {
      this.user().set(response.user, {parse: true});
      delete response.user
    }

    return response;
  }
});
