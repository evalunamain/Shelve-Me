ShelveMe.Routers.Router = Backbone.Router.extend({
  initialize: function (options){
    this.$rootEl = options.$rootEl;
    this.collection = ShelveMe.Collections.users;
    this.collection.fetch();
  },

  routes: {
    "": "index",
    "books": "bookIndex",
    "explore": "explore",
    "books/:id": "bookShow",
    "authors/:id": "authorShow",
    "users": "userIndex",
    "users/new": "newUser",
    "users/:id": "userShow",
    "users/:user_id/shelves/:shelf_id": "shelfShow",
    "session/new": "signIn"
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

  newUser: function(){
    if (!this._requireSignedOut()) { return; }

    var model = new this.collection.model();
    var formView = new ShelveMe.Views.UsersForm({
      collection: this.collection,
      model: model
    });
    this._swapView(formView);
  },

  shelfShow: function (userId, shelfId) {
    var shelf = ShelveMe.Collections.shelves.getOrFetch(shelfId);
    var user = ShelveMe.Collections.users.getOrFetch(userId);
    var shelfShowView = new ShelveMe.Views.ShelfShow({
      model: shelf, user: user
    });
    this._swapView(shelfShowView);
  },

  signIn: function(callback){
    if (!this._requireSignedOut(callback)) { return; }

    var signInView = new ShelveMe.Views.SignIn({
      callback: callback
    });
    this._swapView(signInView);
  },

  _requireSignedIn: function(callback){
    if (!ShelveMe.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      this.signIn(callback);
      return false;
    }

    return true;
  },

  _requireSignedOut: function(callback){
    if (ShelveMe.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    }

    return true;
  },

  _goHome: function(){
    Backbone.history.navigate("", { trigger: true });
  },

  _swapView: function (view){
    this._currentView && this._currentView.remove();
		console.log('swapping views');
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
