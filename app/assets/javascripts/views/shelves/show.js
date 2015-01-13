ShelfLife.Views.ShelfShow = Backbone.CompositeView.extend({

  template: JST['shelves/show'],

  className: "index",

  initialize: function (options) {
    console.log("making shelf view");
    this.user = options.user;
    this.shelf = this.model;
    var that = this;
    this.listenTo(this.user, 'sync', this.render);

  },

  render: function (){
    console.log("rendering shelf show");
    var content = this.template({user: this.user});

    this.$el.html(content);
    this.renderBooks();
    return this;
  },

  events: {
    "click .shelf": "newShelf",
  },

  render2: function (){
    console.log("rendering shelf show");
    var content = this.template({user: this.user});
    debugger
    this.$el.html(content);
    this.renderBooks();
    return this;
  },

  renderBooks: function (newShelf) {
    console.log("rendering books on shelf");
    var shelf = newShelf || this.shelf;
    var bookView = new ShelfLife.Views.BookShelf({
      model: shelf
    });
    $('.shelf-show').empty();
    this.addSubview('.shelf-show', bookView);
  },

  newShelf: function (event) {
    event.preventDefault();
    var shelfId = $(event.currentTarget).data("id")
    var shelf = this.user.shelves().getOrFetch(shelfId);
    console.log(shelf);
    this.renderBooks(shelf);
  }




});
