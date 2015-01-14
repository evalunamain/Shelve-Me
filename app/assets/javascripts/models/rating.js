ShelfLife.Models.Rating = Backbone.Model.extend({
  urlRoot: 'api/ratings',
  // 
  // books: function () {
  //   if (!this._books) {
  //     this._books = new ShelfLife.Collections.Books()
  //   }
  //
  //   return this._books;
  // },
  //
  // user: function () {
  //   if (!this._user) {
  //     this._user = new ShelfLife.Models.User()
  //   }
  //
  //   return this._user;
  // },
  //
  // parse: function (response) {
  //   if (response.books) {
  //     this.books().set(response.books, {parse: true});
	// 		delete response.books
  //   }
  //
  //   if (response.user) {
  //     this.user().set(response.user, {parse: true});
  //     delete response.user
  //   }
  //
  //   return response;
  // }
});
