ShelveMe.Views.BookShow = Backbone.CompositeView.extend({

  template: JST["books/show"],

  ratingTemplate: JST["books/rating"],

  newReviewTemplate: JST["books/new-review"],

  tagName: "section",

  initialize: function (options) {
    this.listenToOnce(this.model, "sync", this.render);
    this.listenTo(this.model, "sync", this.renderRating);
    this.listenTo(this.model, "sync", this.renderReview);
    this.error = {};

    this.$reviewModal = $(".review.modal");
    this.$shelfModal = $('.shelf.modal');
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
    this.renderReview();
    return this;
  },

  renderBook: function () {
    var content = this.template({book: this.model, shelves: this.model.shelves()});
    this.$el.html(content);
    return this;
  },

  renderRating: function () {
    var content = this.ratingTemplate({book: this.model, error: this.error});
    $(".book-rating").html(content);

    if (ShelveMe.currentUser) {
      this.rating = this.model.ratings().where({
      user_id: ShelveMe.currentUser.id})[0];
    }

    this.rating = this.rating || new ShelveMe.Models.Rating()
    var rating = this.rating.get("rating");

    var ratedStar = this.$(".rating-input").filter(function () {
      return this.value == rating}
    );

    ratedStar.attr("checked", true);
    return this;
  },

  renderReview: function () {
    var that = this;
    this.$(".book-reviews").empty();

    this.model.reviews().each(function (review) {
      var rating = that.model.ratings().where({
        user_id: review.author().id}
      )[0];

      var reviewView = new ShelveMe.Views.BookReview({
        model: review, rating: rating
      });

      that.addSubview(".book-reviews", reviewView);
    });
  },

  rateBook: function (event) {
    event.preventDefault();

    var rating = $(event.currentTarget).val(),
      that = this;

    this.rating.save({
        rating: rating,
        book_id: this.model.id,
      }, {
      success: function (){
        that.model.fetch();
      },
      error: function () {
        that.error.rating = "Please sign in to rate this book."
				that.renderRating();

				$('.rating-input').attr('checked', false);
        $('.error-message').addClass('alert'),

        that.alertMessage();
      }
    });
  },

  alertMessage: function () {
    window.setTimeout(function () {
      $(".error-message").removeClass("alert")
    }, 1300);
  },

	openShelfModal: function (event) {
		event.preventDefault();
	  this.$shelfModal.addClass("is-open");
	},

	closeShelfModal: function (event) {
		event.preventDefault();
    this.$shelfModal.removeClass("is-open");
	},

  closeModals: function (event) {
    event.preventDefault();
    this.$shelfModal.removeClass("is-open");
    this.$reviewModal.removeClass("is-open");
  },

	toggleShelf: function (event) {
		event.preventDefault();
		var onShelf = $(event.currentTarget).data("on-shelf");

		$(event.currentTarget).prop("disabled", true);
		if (onShelf === false) {
			this.addToShelf(event)
		} else {
			this.removeFromShelf(event)
		}
	},

	addToShelf: function (event) {
		var shelfId = $(event.currentTarget).val();

		$.ajax({
      url: "/api/shelved_books",
      type: "POST",
      dataType: "json",
      data: {book_id: this.model.id, shelf_id: shelfId},
      success: function () {
				$(event.currentTarget).data('on-shelf', true)
				                      .prop('checked', true)
				                      .prop('disabled', false);
      }
    });
	},

	removeFromShelf: function (event) {
		var shelfId = $(event.currentTarget).val();

		$.ajax({
      url: "/api/shelved_books/destroy",
      type: "DELETE",
      dataType: "json",
      data: {book_id: this.model.id, shelf_id: shelfId},
      success: function () {
				$(event.currentTarget).data('on-shelf', false)
			                        .prop('checked', false)
				                      .prop('disabled', false);
      },
			error: function () {
				$(event.currentTarget).prop('disabled', false);
			}
    });
	},

  openReviewModal: function (event) {
    event.preventDefault();
    that.$reviewModal.addClass("is-open");
  },

  newReview: function (event) {
    event.preventDefault();

    var that = this,
      data = $(event.currentTarget).serializeJSON().review,
      review = new ShelveMe.Models.Review();

    review.save(data, {
      success: function (model, response){
        that.model.fetch();
        that.$reviewModal.removeClass("is-open");
      }
    })
  },

});
