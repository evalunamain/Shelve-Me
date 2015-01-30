ShelveMe.Views.UserItem = Backbone.View.extend({

  template: JST['users/index-item'],

  tagName: "li",

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var button,
      isFriend = (ShelveMe.currentUser.isSignedIn() &&
                  ShelveMe.currentUser.isFriend(this.model));

    if (isFriend) {
      button = "Remove as friend";
    } else {
      button = "Add as friend";
    }

    var content = this.template({
      user: this.model, isFriend: isFriend, button: button
    });

    this.$el.html(content);
    return this;
  },

  events: {
    "click .friend-toggle":"toggleFriend"
  },

  toggleFriend: function (event) {
    event.preventDefault();

    var isFriend = $(event.currentTarget).data("initial-friend-state");
    if (!isFriend) {
      this.addFriend()
    } else {
      this.removeFriend()
    }
  },

  addFriend: function (event) {
    var friendId = this.model.id,
      friendship = new ShelveMe.Models.Friendship,
      that = this;

		friendship.save({friend_id: friendId}, {
			success: function () {
        ShelveMe.currentUser.friends().add(that.model);
        that.render();
			}
    });
  },

  removeFriend: function () {
    var friendId = this.model.id,
      that = this;

    $.ajax({
      url: "/api/friendships/destroy",
      type: "DELETE",
      dataType: "json",
      data: {friend_id: friendId},
      success: function () {
        ShelveMe.currentUser.friends().remove(that.model);
        that.render();
      }
    })
  }

});
