ShelveMe.Views.BooksNew = Backbone.CompositeView.extend({

  template: JST["books/new-book"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.addFormView();
  },

  addFormView: function (book) {
    var formView = new ShelveMe.Views.BookForm({
      model: new ShelveMe.Models.Book
    });

    this.addSubview(".new-book", formView);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

});
