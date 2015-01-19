ShelveMe.Views.friendView = Backbone.CompositeView.extend({

  template: JST['users/friends'],

  tagName: "section",

  initialize: function () {
    this.listenToOnce(this.model, 'sync', this.render);
    // this.listenTo(this.collection, "update-friends", this.update);
  },

  render: function (){
		console.log('all friends rendering');
    var content = this.template();
    this.$el.html(content);
    this.addFriendViews();
    return this;
  },

	addFriendViews: function () {
    this.model.pending_friendships() &&
      this.model.pending_friendships().each(this.attachPendingFriends.bind(this));

		this.model.accepted_friendships() &&
		 this.model.accepted_friendships().each(
			 this.attachAcceptedFriends.bind(this));

		this.model.friendship_requests &&
      this.model.friendship_requests().each(this.attachFriendRequests.bind(this));
	},


	attachPendingFriends: function(friendship) {
		var friendView = new ShelveMe.Views.pendingFriendView({
			model: friendship
		});
		this.addSubview('ul.pending-friends', friendView);
	},

	attachAcceptedFriends: function(friendship) {
		var friendView = new ShelveMe.Views.acceptedFriendView({
			model: friendship
		});
		this.addSubview('ul.accepted-friends', friendView);
	},

  attachFriendRequests: function (friendship) {
		var friendView = new ShelveMe.Views.friendRequestView({
			model: friendship, user: this.model
		});
		this.addSubview('ul.friendship-requests', friendView);
  },


});
