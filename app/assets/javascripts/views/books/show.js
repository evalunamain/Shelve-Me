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


  render2: function (){
    debugger
    var content = this.template({book: this.model});

    this.$el.html(content);
    return this;
  },
	
	events: {
		"click .js-modal-open": "openModal",
		"click .js-modal-close": "closeModal",
		"click .modal-checkbox": "toggleShelf",
	},
	
	// addToShelf: function (event) {
// 		event.preventDefault();
// 		var formData = $(event.currentTarget).serializeJSON();
// 		var that = this;
//
//     $.ajax({
//       url: "/api/shelved_books",
//       type: "POST",
//       dataType: "json",
//       data: formData,
//       success: function () {
//         console.log("added to shelf");
//         // ShelfLife.currentUser.selved_books().remove(that.model);
//         that.render();
//       }
//     })
// 	},
	
	openModal: function (event) {
		event.preventDefault();
		console.log('opening modal');
		$('.modal').addClass("is-open");
	},
	
	closeModal: function (event) {
		event.preventDefault();
		$(".modal").removeClass("is-open");
	},
	
	toggleShelf: function (event) {
		//TODO: check boxes but send all requests upon form closure as transaction to rails
		console.log("click register");
		event.preventDefault();
		var onShelf = $(event.currentTarget).data("on-shelf");
		var shelf = $(event.currentTarget).val();
		$(event.currentTarget).prop('disabled', true);
		if (!onShelf) {
			this.addToShelf(event)
		} else {
			this.removeFromShelf(event)
		}
	},
	
	addToShelf: function (event) {
		console.log("adding to shelf");
		var shelfId = $(event.currentTarget).val();
	
		$.ajax({
      url: "/api/shelved_books",
      type: "POST",
      dataType: "json",
      data: {book_id: this.model.id, shelf_id: shelfId},
      success: function () {
        console.log("added to shelf");
				$(event.currentTarget).data("on-shelf", "true");
				$(event.currentTarget).prop('checked', true);
				$(event.currentTarget).prop('disabled', false);
      }
    })
	},
	
	removeFromShelf: function (event) {
		console.log("removing from shelf");
		var shelfId = $(event.currentTarget).val();
	
		$.ajax({
      url: "/api/shelved_books/destroy",
      type: "DELETE",
      dataType: "json",
      data: {book_id: this.model.id, shelf_id: shelfId},
      success: function () {
        console.log("removed to shelf");
				$(event.currentTarget).data("on-shelf", "false");
				$(event.currentTarget).prop('checked', false);
				$(event.currentTarget).prop('disabled', false);
      }
    })
	}

});
