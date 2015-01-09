ShelfLife.Views.BookItem = Backbone.View.extend({

  template: JST['books/book-item'],

  tagName: "li",

  className: "book-overview",

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function (){
    var content = this.template({book: this.model});
    this.$el.html(content);
    return this;
  }

});
