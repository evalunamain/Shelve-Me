ShelfLife.Views.AuthorShow = Backbone.CompositeView.extend({

  template: JST['authors/show'],

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
    this.collection.each(this.addBookView.bind(this));
    var content = this.template({author: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },


});
