ShelveMe.Views.UserShow = Backbone.CompositeView.extend({

  template: JST['users/show'],

  tagName: "section",

	className: "group",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({user: this.model});
    this.$el.html(content);
		if (this.model && ShelveMe.currentUser.isSignedIn()) {
			if (this.model.id === ShelveMe.currentUser.id) {
   		this.addFriendViews();
			}
		}

    return this;
  },

	addFriendViews: function () {
		var user = this.model;

    var friendView = new ShelveMe.Views.friendView({
			model: user, collection: user.friends()
		});

		this.addSubview("section.index", friendView);
	},

});
