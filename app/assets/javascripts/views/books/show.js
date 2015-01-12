ShelfLife.Views.BookShow = Backbone.View.extend({

  template: JST['books/show'],

  tagName: "section",


  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function (){
  
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
		"submit #add-to-shelf": "addToShelf"
	},
	
	addToShelf: function (event) {
		event.preventDefault();
		var formData = $(event.currentTarget).serializeJSON();
		var that = this;
		
    $.ajax({
      url: "/api/shelved_books",
      type: "POST",
      dataType: "json",
      data: formData,
      success: function () {
        console.log("added to shelf");
        // ShelfLife.currentUser.selved_books().remove(that.model);
        that.render();
      }
    })
	}

});
