ShelfLife.Collections.Ratings = Backbone.Collection.extend({
  url: 'api/ratings',

  model: ShelfLife.Models.Rating,

  getOrFetch: function (id){
    var rating = this.get(id);
    var ratings = this;

    if (!rating) {
      rating = new ShelfLife.Models.Rating({id: id});
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
