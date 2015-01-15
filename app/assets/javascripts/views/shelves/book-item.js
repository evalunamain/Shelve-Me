ShelfLife.Views.shelfBookItem = Backbone.View.extend({

  template: JST['shelves/book-item'],

  tagName: "tr",

  // className: "book-overview",

  initialize: function () {
    // this.model.fetch();

    this.listenToOnce(this.model, 'sync', this.render);

    // debugger
  },

  render: function (){
    this.rating = this.model.ratings().where({user_id: ShelfLife.currentUser.id})[0] ||
    new ShelfLife.Models.Rating();
    var rating = this.rating.get('rating');
    var content = this.template({book: this.model});
    this.$el.html(content);
    var ratedStar = this.$('.rating-input').filter(function () {
      return this.value == rating});
    ratedStar.attr('checked', true);

    return this;
  }

});
