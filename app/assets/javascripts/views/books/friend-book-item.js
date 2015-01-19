ShelveMe.Views.friendBookItem = Backbone.View.extend({

  template: JST['books/friend-index-item'],

  tagName: "li",

  className: "book-overview",

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function (){
    var book = this.model.favorite_book()
    var content = this.template({friend: this.model, book: book});
    this.$el.html(content);
    return this;
  },

  render2: function (){
    var rating = this.model.ratings().first;
    console.log("ratings" , this.model.ratings());
    debugger
    var content = this.template({book: this.model});
    this.$el.html(content);
    return this;
  }

});
