ShelveMe.Views.ShelfShow = Backbone.CompositeView.extend({

  template: JST['shelves/show'],

  className: "index group",

  initialize: function (options) {
    this.user = options.user;
    this.listenToOnce(this.user, "sync", this.render);
  },

  events: {
    "click .shelf": "newShelf",
  },

  render: function () {
    var content = this.template({user: this.user});
    this.$el.html(content);
    this.renderBooks();
    return this;
  },

  renderBooks: function (newShelf) {
    var shelf = newShelf || this.model,
      shelfView = new ShelveMe.Views.BookShelf({
      model: shelf, user: this.user
    });

    this.$(".shelf-show").empty();
    this.addSubview('.shelf-show', shelfView);
  },

  newShelf: function (event) {
    event.preventDefault();

    var shelfId = $(event.currentTarget).data("id"),
      shelf = this.user.shelves().getOrFetch(shelfId);
    this.renderBooks(shelf);
  },




});
