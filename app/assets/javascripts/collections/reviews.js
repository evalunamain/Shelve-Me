ShelfLife.Collections.Ratings = Backbone.Collection.extend({
  url: 'api/reviews',

  model: ShelfLife.Models.Review,

  getOrFetch: function (id){
    var review = this.get(id);
    var reviews = this;

    if (!review) {
      review = new ShelfLife.Models.Review({id: id});
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
