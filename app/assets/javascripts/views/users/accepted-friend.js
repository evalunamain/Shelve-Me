ShelfLife.Views.acceptedFriendView = Backbone.View.extend({

  template: JST['users/accepted-friend'],

  tagName: "li",

  initialize: function (options) {
    this.friend = this.model.friend();
  },

  render: function (){
		console.log('accept rendering');

    var content = this.template({
			friendship: this.model,
			friend: this.friend
		});

    this.$el.html(content);
    return this;
  },

  events: {
    "click .friend-toggle":"removeFriend"
  },

  removeFriend: function (event) {
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
