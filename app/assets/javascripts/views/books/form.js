ShelfLife.Views.BookForm = Backbone.View.extend({

  template: JST['books/form'],

  tagName: "form",

  className: "new-book",

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function (){
    var content = this.template({book: this.model});
    this.$el.html(content);
    return this;
  },
	
	events: {
		"submit": "addBook"
	},
	
	addBook: function (event){
		event.preventDefault();
		formData = this.$el.serializeJSON();
		book = new ShelfLife.Models.Book(formData);
		book.save({}, {
			success: function (){
				console.log('book added');
				Backbone.history.navigate("", {trigger: true})
			}
		})
	}

});
