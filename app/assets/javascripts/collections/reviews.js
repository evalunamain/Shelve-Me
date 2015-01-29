ShelveMe.Collections.Reviews = Backbone.Collection.extend({
  url: "api/reviews",

  model: ShelveMe.Models.Review,

  comparator: function (review) {
    return -review.get("id");
  },

  getOrFetch: function (id) {
    var review = this.get(id);
    var reviews = this;

    if (!review) {
      review = new ShelveMe.Models.Review({id: id});
      review.fetch({
        success: function (){
          reviews.add(review);
        }
      });
    } else {
      review.fetch();
    }

    return review;
  }

});
