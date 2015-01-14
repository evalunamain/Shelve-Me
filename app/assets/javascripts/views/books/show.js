ShelfLife.Views.BookShow = Backbone.View.extend({

  template: JST['books/show'],

  ratingTemplate: JST['books/rating'],

  tagName: "section",

  // className: "index",

  initialize: function (options) {
    this.listenToOnce(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.renderRating);
    this.error = {};
  },

  render: function (){
  	console.log('rendering book show');
    var content = this.template({book: this.model});
    this.$el.html(content);
    // this.renderRating();
    return this;
  },

  render2: function (){
  	console.log('rendering book show');
    var content = this.template({book: this.model});
    this.$el.html(content);
    this.renderRating();
    return this;
  },

  renderRating: function (){
    console.log('rendering rating');
    var content = this.ratingTemplate({book: this.model, error: this.error});
    $('.book-rating').html(content);
    if (ShelfLife.currentUser) {
      this.rating = this.model.ratings().where({user_id: ShelfLife.currentUser.id})[0];
    }
    this.rating = this.rating || new ShelfLife.Models.Rating()
    var rating = this.rating.get('rating');
    var ratedStar = $('.rating-input').filter(function () { return this.value == rating});
    ratedStar.attr('checked', true);
    $('.error-message').focus();
    $('.error-message').removeClass('new');
  },

	events: {
		"click .js-modal-open": "openModal",
		"click .js-modal-close": "closeModal",
		"click .modal-checkbox": "toggleShelf",
    "click .rating-input": "rateBook"
	},

  rateBook: function (event) {
    event.preventDefault();
    var rating = $(event.currentTarget).val();
    var that = this;

    this.rating.save({
        rating: rating,
        book_id: this.model.id,
      }, {
      success: function (){
        console.log("rated!");
        that.model.fetch();
      },
      error: function () {
        console.log("didn't work");
        that.error.rating = "Please sign in to rate this book."
        that.renderRating();
        $('.error-message').addClass('alert'),
        console.log("alert added");
        that.alertMessage();
      }
    });
  },

  alertMessage: function () {
    window.setTimeout(function () {
      $('.error-message').removeClass('alert')
      console.log("alert removed");
    }, 1500);
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
