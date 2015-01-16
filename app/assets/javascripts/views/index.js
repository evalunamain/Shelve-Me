ShelfLife.Views.indexView = Backbone.CompositeView.extend({

  template: JST['index'],

  // tagName: "li",

  initialize: function (options) {
    this.listenToOnce(this.collection, "sync", this.renderTrendingBooks);
    this.currentUser = ShelfLife.currentUser || new ShelfLife.Models.User()
    this.listenToOnce(this.currentUser, "sync", this.renderFriendBooks);
  },

  render: function (){
    var content = this.template();
    this.$el.html(content);
    this.renderFriendBooks();
    this.renderTrendingBooks();
    return this;
  },

  renderFriendBooks: function (){
    if (ShelfLife.currentUser){
      console.log("current user found");
      console.log(ShelfLife.currentUser);
      ShelfLife.currentUser.acceptedFriends().each(this.addFriendView.bind(this));
    }
    return this;
  },

  addFriendView: function (friend) {
    console.log(friend);
    var friendView = new ShelfLife.Views.friendBookItem({
      model: friend
    });
    this.addSubview('ul.friend-feed', friendView);
  },

  renderTrendingBooks: function (){
    console.log("rendering books");
    var newBooks = ShelfLife.Collections.books.first(8);
    console.log(newBooks);
    _.chain(newBooks).each(this.addBookView.bind(this));
  },

  addBookView: function (book) {
    var bookView = new ShelfLife.Views.indexBookItem({
      model: book
    });
    this.addSubview('ul.trending-books', bookView);
  },

});
