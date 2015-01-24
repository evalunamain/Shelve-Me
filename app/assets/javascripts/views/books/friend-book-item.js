ShelveMe.Views.friendBookItem = Backbone.View.extend({

  template: JST['books/friend-index-item'],

  tagName: "li",

  className: "book-overview",

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function (){
    console.log("friend found");
    var book = this.model.favorite_book()
    console.log(book);
    // if (book.isNew()) {
    //   var content = "<p class='index'></p>"
    //
    // } else {
      var content = this.template({friend: this.model, book: book});
    // }
    this.$el.html(content);
    return this;
  },

});
