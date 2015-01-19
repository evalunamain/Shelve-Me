ShelveMe.Views.UserItem = Backbone.View.extend({

  template: JST['users/index-item'],

  tagName: "li",

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function (){
    var isFriend = ShelveMe.currentUser && ShelveMe.currentUser.isFriend(this.model);
    if (isFriend) {
      button = "Remove as friend"
    } else {
      button = "Add as friend"
    }
		

    var content = this.template({user: this.model, isFriend: isFriend, button: button});
    this.$el.html(content);
    return this;
  },

  events: {
    "click .friend-toggle":"toggleFriend"
  },

  toggleFriend: function (event) {
    console.log("in toggle friend");
    event.preventDefault();
    var isFriend = $(event.currentTarget).data("initial-friend-state");
    if (!isFriend) {
      this.addFriend()
    } else {
      this.removeFriend()
    }
  },

  addFriend: function (event) {
    console.log("in add friend");
    var friendId = this.model.id;
    var that = this;
		
		var friendship = new ShelveMe.Models.Friendship;
		friendship.save({friend_id: friendId},{ 
			success: function () {
        console.log("added friend");
        ShelveMe.currentUser.friends().add(that.model);
        that.render();
			}
     });

    // $.ajax({
 //      url: "/api/friendships/",
 //      type: "POST",
 //      dataType: "json",
 //      data: {friend_id: friendId},
 //      success: function () {
 //        console.log("added friend");
 //        ShelveMe.currentUser.friends().add(that.model);
 //        that.render();
 //      }
 //    })
  },

  removeFriend: function (){
    console.log("in remove friend");
    var friendId = this.model.id;
    var that = this;

    $.ajax({
      url: "/api/friendships/destroy",
      type: "DELETE",
      dataType: "json",
      data: {friend_id: friendId},
      success: function () {
        console.log("removed friend");
        ShelveMe.currentUser.friends().remove(that.model);
        that.render();
      }
    })
  }


});
