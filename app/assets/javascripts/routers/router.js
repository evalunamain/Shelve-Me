ShelfLife.Routers.Router = Backbone.Router.extend({
  initialize: function (options){
    this.$rootEl = options.$rootEl
  },

  routes: {
    "": "index",
    "books": "bookIndex",
    "books/new": "bookNew",
    "books/:id": "bookShow"
  },

  index: function (){
    console.log("in index")
  },

  bookIndex: function (){
    ShelfLife.Collections.books.fetch();
    var bookIndexView = new ShelfLife.Views.BooksIndex({
      collection: ShelfLife.Collections.books
    });
    this._swapView(bookIndexView);
  },

  bookNew: function (){

  },

  bookShow: function (id){
    var book = ShelfLife.Collections.books.getOrFetch(id);
    var bookShow = new ShelfLife.Views.BookShow({
      model: book
    });
    this._swapView(bookShow);
  },

  _swapView: function (view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
