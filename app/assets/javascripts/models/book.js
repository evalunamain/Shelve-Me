ShelfLife.Models.Book = Backbone.Model.extend({
  urlRoot: 'api/books',

  author: function () {
    if (!this._author) {
      this._author = new ShelfLife.Models.Author()
    }

    return this._author
  },
	
	shelves: function () {
		if (!this._shelves) {
			this._shelves = new ShelfLife.Collections.Shelves()
		}
		return this._shelves
	},

  parse: function (response) {
    if (response.author) {
      this.author().set(response.author, {parse: true})
			delete response.author
    }
		
		if (response.shelves) {
			this.shelves().set(response.shelves, {parse: true})
			delete response.shelves
		}
		
		return response
  },
	
	onShelf: function (shelfId) {
		return !!this.shelves().findWhere({id: shelfId});
	}
});
