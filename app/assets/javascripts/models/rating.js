ShelfLife.Models.Rating = Backbone.Model.extend({
  urlRoot: 'api/ratings',
  
	toJSON: function (options) {
		return {rating: _.clone(this.attributes)};
	},
});
