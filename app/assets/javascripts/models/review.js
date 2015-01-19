ShelveMe.Models.Review = Backbone.Model.extend({
  urlRoot: 'api/reviews',

	toJSON: function (options) {
		return {review: _.clone(this.attributes)};
	},

  parse: function (response) {
    if (response.author) {
      this.author().set(response.author, {parse: true});
      delete response.author
    }
    return response;
  },

  author: function () {
    if (!this._author){
      this._author = new ShelveMe.Models.User();
    }
    return this._author;
  }
});
