ShelfLife.Views.BookShow = Backbone.View.extend({

  template: JST['books/show'],

  tagName: "section",

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function (){
  	console.log('rendering book show');
    var content = this.template({book: this.model});

    this.$el.html(content);
    return this;
  },

	events: {
		"click .js-modal-open": "openModal",
		"click .js-modal-close": "closeModal",
		"click .modal-checkbox": "toggleShelf",
	},

	openModal: function (event) {
		event.preventDefault();
		$('.modal').addClass("is-open");
	},

	closeModal: function (event) {
		event.preventDefault();
		$(".modal").removeClass("is-open");
	},

	toggleShelf: function (event) {
		//TODO: check boxes but send all requests upon form closure as transaction to rails
		event.preventDefault();
		var onShelf = $(event.currentTarget).data("on-shelf");

		$(event.currentTarget).prop('disabled', true);
		if (onShelf === false) {
			this.addToShelf(event)
		} else {
			this.removeFromShelf(event)
		}
	},

	addToShelf: function (event) {
    console.log("adding to shelf");
		var shelfId = $(event.currentTarget).val();
    console.log(shelfId);

		$.ajax({
      url: "/api/shelved_books",
      type: "POST",
      dataType: "json",
      data: {book_id: this.model.id, shelf_id: shelfId},
      success: function () {
				$(event.currentTarget).data('on-shelf', true);
				$(event.currentTarget).prop('checked', true);
				$(event.currentTarget).prop('disabled', false);
      }
    })
	},

	removeFromShelf: function (event) {
    console.log("removing from shelf");
		var shelfId = $(event.currentTarget).val();
    console.log(shelfId);
		$.ajax({
      url: "/api/shelved_books/destroy",
      type: "DELETE",
      dataType: "json",
      data: {book_id: this.model.id, shelf_id: shelfId},
      success: function () {
				$(event.currentTarget).data('on-shelf', false);
				$(event.currentTarget).prop('checked', false);
				$(event.currentTarget).prop('disabled', false);
      },
			error: function () {
				$(event.currentTarget).prop('disabled', false);
			}
    })
	}

});
