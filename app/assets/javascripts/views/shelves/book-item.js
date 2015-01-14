ShelfLife.Views.BookItem = Backbone.View.extend({

  template: JST['shelves/book-item'],

  tagName: "tr",

  // className: "book-overview",

  initialize: function () {
    this.model.fetch();
    this.listenToOnce(this.model, 'sync', this.render);
    // debugger
  },

  render: function (){
    var content = this.template({book: this.model});
    this.$el.html(content);
    return this;
  }

});
