ShelfLife.Views.UserShow = Backbone.CompositeView.extend({

  template: JST['users/show'],

  tagName: "section",

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.render);

  },



  render: function (){
    this.attachFriends();
    var content = this.template({user: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  attachFriends: function () {
    this.model.pending_friends && this.attachPendingFriends();
    this.model.accepted_friends && this.attachPendingFriends();
    this.model.requesting_friends && this.attachRequestingFriends();
  },




  addBookView: function (book) {
    var bookView = new ShelfLife.Views.BookItem({
      model: book
    });
    this.addSubview('ul.index', bookView);
  },
});
