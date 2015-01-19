ShelveMe.Routers.Router = Backbone.Router.extend({
  initialize: function (options){
    this.$rootEl = options.$rootEl
  },

  routes: {
    "": "index",
    "books": "bookIndex",
    "explore": "explore",
    "books/:id": "bookShow",
    "authors/:id": "authorShow",
    "users": "userIndex",
    "users/:id": "userShow",
    "users/:user_id/shelves/:shelf_id": "shelfShow",
  },

  index: function (){
    console.log("in index");
    ShelveMe.currentUser && ShelveMe.currentUser.fetch();
    ShelveMe.Collections.books.fetch();
		var indexView = new ShelveMe.Views.indexView({
      collection: ShelveMe.Collections.books
		});
		this._swapView(indexView);
  },

  bookIndex: function (){
    ShelveMe.Collections.books.fetch();
    var bookIndexView = new ShelveMe.Views.BooksIndex({
      collection: ShelveMe.Collections.books
    });
    this._swapView(bookIndexView);
  },

  explore: function (){
    var newBookView = new ShelveMe.Views.BooksNew({
      model: new ShelveMe.Models.Book
    });

    this._swapView(newBookView);
  },

  bookShow: function (id){
    var book = ShelveMe.Collections.books.getOrFetch(id);

    var bookShow = new ShelveMe.Views.BookShow({
      model: book, collection: book.reviews()
    });

    this._swapView(bookShow);
  },

  authorShow: function (id){
    var author = ShelveMe.Collections.authors.getOrFetch(id);
    author.books().fetch();
    var authorShowView = new ShelveMe.Views.AuthorShow({
      model: author, collection: author.books()
    });
    this._swapView(authorShowView);
  },

  userIndex: function (){
    ShelveMe.Collections.users.fetch();

    var userIndexView = new ShelveMe.Views.UsersIndex({
      collection: ShelveMe.Collections.users
    });
    this._swapView(userIndexView);
  },

  userShow: function (id) {
    var user = ShelveMe.Collections.users.getOrFetch(id);
    var userShowView = new ShelveMe.Views.UserShow({
      model: user, collection: user.friends()
    });
    this._swapView(userShowView);
  },

  shelfShow: function (userId, shelfId) {
    var shelf = ShelveMe.Collections.shelves.getOrFetch(shelfId);
    var user = ShelveMe.Collections.users.getOrFetch(userId);
    var shelfShowView = new ShelveMe.Views.ShelfShow({
      model: shelf, user: user
    });
    this._swapView(shelfShowView);
  },

  _swapView: function (view){
    this._currentView && this._currentView.remove();
		console.log('swapping views');
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
