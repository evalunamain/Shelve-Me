ShelveMe.Views.acceptedFriendView = Backbone.View.extend({

  template: JST['users/accepted-friend'],

  tagName: "li",

  initialize: function (options) {
    this.friend = this.model.friend();
  },

  render: function () {
    var content = this.template({
			friendship: this.model,
			friend: this.friend
		});

    this.$el.html(content);
    return this;
  },

  events: {
    "click .friend-toggle": "removeFriend"
  },

  removeFriend: function (event) {
    event.preventDefault();
    var friendId = this.model.escape('friend_id'),
		  that = this;

    $.ajax({
      url: "/api/friendships/destroy",
      type: "DELETE",
      dataType: "json",
      data: {friend_id: friendId},
      success: function () {
        that.remove();
      }
    })
  },

});
