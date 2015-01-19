ShelveMe.Views.BookShelf = Backbone.CompositeView.extend({

  template: JST['shelves/book-shelf'],

  bookTemplate: JST['shelves/book-item'],

  className: "shelf-books",

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
    this.user = options.user;
  },

  render: function (){
    console.log("rendering shelf header");
    var content = this.template({shelf: this.model});
    this.$el.html(content);
    this.model.books().each(this.renderBook.bind(this));
    return this;
  },

  renderBook: function (book) {
    var bookView = new ShelveMe.Views.shelfBookItem({model: book});
    this.addSubview('.book-rows', bookView);
  },

});
