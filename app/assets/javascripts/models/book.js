ShelveMe.Models.Book = Backbone.Model.extend({
  urlRoot: "api/books",

  parse: function (response) {
    if (response.author) {
      this.author().set(response.author, {parse: true})
      delete response.author
    }

    if (response.shelves) {
      this.shelves().set(response.shelves, {parse: true})
      delete response.shelves
    }

    if (response.reviews) {
      this.reviews().set(response.reviews, {parse: true})
      delete response.reviews
    }

    if (response.ratings) {
      this.ratings().set(response.ratings, {parse: true})
      delete response.ratings
    }

		return response
  },

  author: function () {
    if (!this._author) {
      this._author = new ShelveMe.Models.Author()
    }

    return this._author
  },

	shelves: function () {
		if (!this._shelves) {
			this._shelves = new ShelveMe.Collections.Shelves()
		}
		return this._shelves
	},

  reviews: function () {
    if (!this._reviews) {
      this._reviews = new ShelveMe.Collections.Reviews()
    }
    return this._reviews
  },

  ratings: function () {
    if (!this._ratings) {
      this._ratings = new ShelveMe.Collections.Ratings()
    }

    return this._ratings
  },

	onShelf: function (shelfId) {
		return !!this.shelves().findWhere({id: shelfId});
	}
});
