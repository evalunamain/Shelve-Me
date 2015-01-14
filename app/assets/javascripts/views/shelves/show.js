ShelfLife.Views.ShelfShow = Backbone.CompositeView.extend({

  template: JST['shelves/show'],

  className: "index",

  initialize: function (options) {
    console.log("making shelf view");
    this.user = options.user;
    this.listenToOnce(this.user, 'sync', this.render);
  },

  events: {
    "click .shelf": "newShelf",
  },

  render: function (){
    console.log("rendering shelf show");
    var content = this.template({user: this.user});
    this.$el.html(content);
    this.renderBooks();
    return this;
  },

  renderBooks: function (newShelf) {
    console.log("rendering books on shelf");
    var shelf = newShelf || this.model;
    var shelfView = new ShelfLife.Views.BookShelf({
      model: shelf, user: this.user
    });
    this.$('.shelf-show').empty();
    this.addSubview('.shelf-show', shelfView);
  },

  newShelf: function (event) {
    event.preventDefault();
    var shelfId = $(event.currentTarget).data("id")
    var shelf = this.user.shelves().getOrFetch(shelfId);
    console.log("rendering new shelf", shelf);
    this.renderBooks(shelf);
  },




});
