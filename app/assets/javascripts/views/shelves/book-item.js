ShelveMe.Views.shelfBookItem = Backbone.View.extend({

  template: JST['shelves/book-item'],

  tagName: "tr",

  // className: "book-overview",

  initialize: function () {
    // this.model.fetch();

    this.listenToOnce(this.model, 'sync', this.render);

    // debugger
  },

  render: function (){
		if (!ShelveMe.currentUser) {
			this.rating =  new ShelveMe.Models.Rating();
		} else {
		this.rating = this.model.ratings().where({user_id: 			ShelveMe.currentUser.id})[0] || new ShelveMe.Models.Rating()
		}
		console.log(this.rating);
    var rating = this.rating.get('rating');
    var content = this.template({book: this.model});
    this.$el.html(content);
    var ratedStar = this.$('.rating-input').filter(function () {
      return this.value == rating});
    ratedStar.attr('checked', true);

    return this;
  }

});
