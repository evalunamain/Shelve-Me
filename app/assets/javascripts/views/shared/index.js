ShelveMe.Views.indexView = Backbone.CompositeView.extend({

  template: JST["shared/index"],

  initialize: function (options) {
    this.listenTo(ShelveMe.currentUser, "sync", this.render);
    this.listenToOnce(ShelveMe.Collections.books, "sync", this.render);
  },

  render: function (){
    var content = this.template();
    this.$el.html(content);
    this.renderFriendBooks();
    this.renderTrendingBooks();
    return this;
  },

  renderFriendBooks: function (){
    if (ShelveMe.currentUser.isSignedIn()) {
      ShelveMe.currentUser.acceptedFriends().each(this.addFriendView.bind(this));
    }
    return this;
  },

  addFriendView: function (friend) {
    var friendView = new ShelveMe.Views.friendBookItem({
      model: friend
    });
    this.addSubview('ul.friend-feed', friendView);
  },

  renderTrendingBooks: function (){
    this.$("ul.trending-books").empty();
    var newBooks = ShelveMe.Collections.books.first(8);
    _.chain(newBooks).each(this.addBookView.bind(this));
  },

  addBookView: function (book) {
    var bookView = new ShelveMe.Views.indexBookItem({
      model: book
    });

    this.addSubview("ul.trending-books", bookView);
  },

});
