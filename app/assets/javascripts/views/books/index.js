ShelfLife.Views.BooksIndex = Backbone.CompositeView.extend({

  template: JST['books/index'],

  className: "index",

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);

  },

  addBookView: function (book) {
    var bookView = new ShelfLife.Views.BookItem({
      model: book
    });
    this.addSubview('ul.books', bookView);
  },

  render: function (){
    this.collection.each(this.addBookView.bind(this));
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

});
