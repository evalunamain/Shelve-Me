ShelveMe.Views.friendBookItem = Backbone.View.extend({

  template: JST["books/friend-index-item"],

  tagName: "li",

  className: "book-overview",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var book = this.model.favorite_book()
    var content = this.template({friend: this.model, book: book});
    this.$el.html(content);
    return this;
  },

});
