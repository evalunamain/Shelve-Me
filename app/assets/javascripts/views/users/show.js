ShelfLife.Views.UserShow = Backbone.CompositeView.extend({

  template: JST['users/show'],

  tagName: "section",

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);

    // this.listenTo(this.collection, 'sync', this.render);
  },

  render: function (){
		console.log('in user show');
    var content = this.template({user: this.model});
    this.$el.html(content);
		if (this.model.id === ShelfLife.currentUser.id) {
   		this.addFriendViews();
		}
    return this;
  },


	addFriendViews: function() {
		var user = this.model;
		var friendView = new ShelfLife.Views.friendView({
			model: user, collection: user.friends()
		});
		this.addSubview('section.index', friendView);
	},

});
