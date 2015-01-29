ShelveMe.Collections.Ratings = Backbone.Collection.extend({
  url: "api/ratings",

  model: ShelveMe.Models.Rating,

  getOrFetch: function (id) {
    var rating = this.get(id);
    var ratings = this;

    if (!rating) {
      rating = new ShelveMe.Models.Rating({id: id});
      rating.fetch({
        success: function (){
          ratings.add(rating);
        }
      });
    } else {
      rating.fetch();
    }

    return rating;
  }

});
