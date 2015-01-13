ShelfLife.Views.ShelfShow = Backbone.CompositeView.extend({

  template: JST['shelves/show'],

  className: "index",

  initialize: function (options) {
    console.log("making shelf view");
    this.user = options.user
    this.listenTo(this.model, 'sync', this.render2);

  },

  // addBookView: function (book) {
  //   var bookView = new ShelfLife.Views.BookItem({
  //     model: book
  //   });
  //   this.addSubview('ul.index', bookView);
  // },

  render: function (){
    console.log("rendering shelf show");
    var content = this.template();
    this.$el.html(content);
    // this.collection.each(this.addBookView.bind(this));
    // this.attachSubviews();
    return this;
  },

  render2: function (){
    debugger
    var content = this.template();
    this.$el.html(content);
    // this.collection.each(this.addBookView.bind(this));
    // this.attachSubviews();
    return this;
  },


});
