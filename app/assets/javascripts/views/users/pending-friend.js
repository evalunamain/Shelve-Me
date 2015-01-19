ShelveMe.Views.pendingFriendView = Backbone.View.extend({

  template: JST['users/pending-friend'],

  tagName: "li",

  initialize: function () {
    this.friend = this.model.friend();
  },

  render: function (){
		var friend = ShelveMe.currentUser.friends().getOrFetch(this.model.escape('friend_id'));

    var content = this.template({
			friendship: this.model,
			friend: friend
		});
		this.$el.empty();
    this.$el.html(content);
    return this;
  },

  events: {
    "click .friend-toggle":"toggleFriend"
  },

  toggleFriend: function (event) {
    console.log("in toggle friend");
    event.preventDefault();
    var friendId = this.model.escape('friend_id');
		var that = this;

    $.ajax({
      url: "/api/friendships/destroy",
      type: "DELETE",
      dataType: "json",
      data: {friend_id: friendId},
      success: function () {
        console.log("removed friend");
        that.remove();
      }
    })

  },


});
