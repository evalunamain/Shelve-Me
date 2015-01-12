ShelfLife.Views.friendView = Backbone.CompositeView.extend({

  template: JST['users/friends'],

  tagName: "section",

  initialize: function () {
    this.listenToOnce(this.model, 'sync', this.render);
		
  },

  render: function (){
		console.log('all friends rendering');
		
    var content = this.template();
		this.addFriendViews();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
	
	addFriendViews: function () {
    this.model.pending_friendships() && 			this.model.pending_friendships().each(this.attachPendingFriends.bind(this));
    
		this.model.accepted_friendships() &&
		 this.model.accepted_friendships().each(
			 this.attachAcceptedFriends.bind(this));

		this.model.friendship_requests &&  		this.model.friendship_requests().each(this.attachFriendRequests.bind(this));
	},
	

	attachPendingFriends: function(friendship) {
		var user = this.model;

		var friendView = new ShelfLife.Views.pendingFriendView({
			model: friendship, collection: this.model.friends()
		});
		this.addSubview('ul.pending-friends', friendView);
	},
	
	attachAcceptedFriends: function(friendship) {
		var friendView = new ShelfLife.Views.acceptedFriendView({
			model: friendship, collection: this.model.friends()
		});
		this.addSubview('ul.accepted-friends', friendView);
	},

  attachFriendRequests: function (friendship) {
		var friendView = new ShelfLife.Views.friendRequestView({
			model: friendship, collection: this.model.friends()
		});
		this.addSubview('ul.friendship-requests', friendView);
  },
	

});