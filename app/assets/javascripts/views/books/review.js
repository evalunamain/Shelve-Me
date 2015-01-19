ShelveMe.Views.BookReview = Backbone.View.extend({

  tagName: "li",

  template: JST['books/review'],

  initialize: function (options) {
    this.rating = options.rating || new ShelveMe.Models.Rating();
    this.listenToOnce(this.model, 'sync', this.render);
  },

  render: function (){
    console.log("rendering existing review");
    this
      .renderContent()
      .renderRating();
    return this;
  },

  renderContent: function () {
    var content = this.template({review: this.model});
    this.$el.html(content);
    return this;
  },

  renderRating: function (){
    var rating = this.rating.get('rating');
    var ratedStar = this.$('.rating-static').filter(function () {
      return this.value == rating
    });
    ratedStar.attr('checked', true);
    this.$("input[type=radio]").attr('disabled', true);
    return this;
  },


});
