ShelfLife.Views.BookShow = Backbone.CompositeView.extend({

  template: JST['books/show'],

  ratingTemplate: JST['books/rating'],

  newReviewTemplate: JST['books/new-review'],

  tagName: "section",

  initialize: function (options) {
    this.listenToOnce(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.renderRating);
    this.listenTo(this.model, 'sync', this.renderReview);
    this.error = {};
  },

  events: {
    "click .js-modal-open.shelf": "openShelfModal",
    "click .js-modal-open.review": "openReviewModal",
    "click .js-modal-close": "closeModals",
    "click .modal-checkbox": "toggleShelf",
    "click .rating-input": "rateBook",
    "submit .modal-review-form": "newReview"
  },

  render: function (){
    this
      .renderBook()
      .renderRating();
      // .renderReviewForm();
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
    console.log('rendering rating');
    var content = this.ratingTemplate({book: this.model, error: this.error});
    $('.book-rating').html(content);
    if (ShelfLife.currentUser) {
        this.rating = this.model.ratings().where({
        user_id: ShelfLife.currentUser.id})[0];
      }

    this.rating = this.rating || new ShelfLife.Models.Rating()
    var rating = this.rating.get('rating');
    var ratedStar = this.$('.rating-input').filter(function () {
        return this.value == rating});
    ratedStar.attr('checked', true);
    $('.error-message').focus();
    $('.error-message').removeClass('new');
    return this;
  },

  // renderReviewForm: function (){
  //   var content = this.newReviewTemplate({book: this.model});
  //   this.$('.new-review').html(content);
  //   return this;
  // },

  renderReview: function (){
    console.log("rendering reviews");
    var that = this;
    this.$('.book-reviews').empty();
    this.model.reviews().each(function (review) {
      var rating = that.model.ratings().where({
        user_id: review.author().id})[0];
      var reviewView = new ShelfLife.Views.BookReview({
        model: review, rating: rating
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

	openShelfModal: function (event) {
		event.preventDefault();
		$('.shelf.modal').addClass("is-open");
	},

	closeShelfModal: function (event) {
		event.preventDefault();
		$(".shelf.modal").removeClass("is-open");
	},

  closeModals: function (event) {
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
	},

  openReviewModal: function (event) {
    event.preventDefault();
    $('.review.modal').addClass("is-open");
    console.log("click registered");
  },

  newReview: function (event) {
    event.preventDefault();
    var that = this;
    console.log("review registered");
    var data = $(event.currentTarget).serializeJSON().review;
    var review = new ShelfLife.Models.Review();
    review.save(data, {
      success: function (model, response){
        // debugger
        console.log('review saved');
        that.model.fetch();
        $(".review.modal").removeClass("is-open");
        // that.renderReview();
      }
    })
  },

});
