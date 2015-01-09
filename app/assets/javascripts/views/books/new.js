ShelfLife.Views.BooksNew = Backbone.CompositeView.extend({

  template: JST['books/new'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.addFormView();
  },

  addFormView: function (book) {
    var formView = new ShelfLife.Views.BookForm({
      model: new ShelfLife.Models.Book
    });
    this.addSubview('.new-book', formView);
  },

  render: function (){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

});
