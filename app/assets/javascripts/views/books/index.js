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
    this.addSubview('ul.index', bookView);
  },

  render: function (){
		console.log("rendering book index");
    var content = this.template();
    this.$el.html(content);
		this.collection.each(this.addBookView.bind(this));
    // this.attachSubviews();
    return this;
  },

});
