ShelfLife.Views.BookShow = Backbone.CompositeView.extend({

  template: JST['books/show'],

  ratingTemplate: JST['books/rating'],

  newReviewTemplate: JST['books/new-review'],

  tagName: "section",

  initialize: function (options) {
    this.listenToOnce(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.renderRating);
    this.error = {};
  },

  events: {
    "click .js-modal-open": "openModal",
    "click .js-modal-close": "closeModal",
    "click .modal-checkbox": "toggleShelf",
    "click .rating-input": "rateBook"
  },

  render: function (){
    this
      .renderBook()
      .renderRating()
      .renderReviewForm();
    this.renderReview();
    return this;
  },

  renderBook: function () {
    console.log('rendering book show');
    var content = this.template({book: this.model});
    this.$el.html(content);
    return this;
  },

  renderRating: function (){
    // debugger
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
    return this;
  },

  renderReviewForm: function (){
    var content = this.newReviewTemplate({book: this.model});
    this.$('.new-review').html(content);
    return this;
  },

  renderReview: function (){
    console.log("rendering reviews");
    // console.log(this.model.reviews());
    var that = this;
    this.model.reviews().each(function (review) {
      console.log("review id ", review.id);
      var reviewView = new ShelfLife.Views.BookReview({
        model: review
      })
      that.addSubview('.book-reviews', reviewView);
    });
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
				$('.rating-input').attr('checked', false);
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
    }, 1300);
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
