ShelfLife.Views.BookShelf = Backbone.View.extend({

  template: JST['shelves/book-shelf'],

  tagName: "ul",

  className: "shelf-books index",

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function (){
    var content = this.template({shelf: this.model});
    this.$el.html(content);
    return this;
  }

});
