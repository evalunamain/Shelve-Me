ShelveMe.Views.BookReview = Backbone.View.extend({

  tagName: "li",

  template: JST["books/review"],

  initialize: function (options) {
    this.rating = options.rating || new ShelveMe.Models.Rating();
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "dblclick .review-content": "makeEditable",
    "keyup .editable":"editReview",
  },

  render: function () {
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
    var rating = this.rating.get("rating");

    var ratedStar = this.$('.rating-static').filter(function () {
      return this.value == rating;
    });

    ratedStar.attr("checked", true);
    this.$("input[type=radio]").attr("disabled", true);
    return this;
  },

  makeEditable: function (event){
    event.preventDefault();

    if (this.model.author().id != ShelveMe.currentUser.id) {
      return;
    } else {
      var textBlock = $(event.currentTarget),
        height = (event.target.clientHeight * 1.5),
        textBox = $("<textarea class='editable'/>"),
        val = this.$(".review-content").html();

      textBox.html(val)
             .css("height", height);

      textBlock.empty();
      this.$el.append(textBox);
    }
  },

  editReview: function (event){
    event.preventDefault();
    if (event.keyCode != 13) {
      return;
    } else {
      var content = $(event.currentTarget).val();
      this.submitReview(content);
    }
  },

  submitReview: function (content) {
    var that = this;

    this.model.save({content: content},
      {patch: true, success: function (){
      that.model.fetch();
    }});
  },

});
