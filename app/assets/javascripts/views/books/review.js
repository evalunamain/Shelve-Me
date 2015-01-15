ShelfLife.Views.BookReview = Backbone.View.extend({

  tagName: "li",

  template: JST['books/review'],

  initialize: function () {
    this.listenToOnce(this.model, 'sync', this.render);
  },

  render: function (){
    console.log("rendering existing review");
    console.log("review author", this.model.author());
    debugger
    var content = this.template({review: this.model});
    this.$el.html(content);
    return this;
  },
});
