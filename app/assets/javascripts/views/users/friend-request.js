ShelveMe.Views.friendRequestView = Backbone.View.extend({

  template: JST["users/friend-request"],

  tagName: "li",

  initialize: function (options) {
	  this.friend = this.model.friend();
    this.user = options.user;
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
    "click .friend-accept":"acceptFriend",
    "click .friend-ignore":"ignoreFriend"
  },

  acceptFriend: function (event) {
    event.preventDefault();

    var friendshipId = this.model.id,
		  that = this;

    $.ajax({
      url: "/api/friendship_activations",
      type: "post",
      dataType: "json",
      data: {friendship_id: friendshipId},
      success: function () {
        that.remove();
        that.user.fetch();
      }
    })
	},

  ignoreFriend: function (event) {
    event.preventDefault();
  }


});
