ShelfLife.Models.Review = Backbone.Model.extend({
  urlRoot: 'api/reviews',
  
	toJSON: function (options) {
		return {review: _.clone(this.attributes)};
	},
});
