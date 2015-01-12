ShelfLife.Views.friendRequestView = Backbone.View.extend({

  template: JST['users/friend-request'],

  tagName: "li",

  initialize: function () {
		var friendId = this.model.get('friend_id');
		this.friend = this.collection.get(friendId);
  },

  render: function (){
		console.log('request rendering');
	
    var content = this.template({
			friendship: this.model,
			friend: this.friend
		});
	
    this.$el.html(content);
    return this;
  },

  events: {
    "click .friend-toggle":"acceptFriend"
  },

  acceptFriend: function (event) {
    console.log("in toggle friend");
    event.preventDefault();
    var friendshipId = this.model.id;
		var that = this;
		
    $.ajax({
      url: "/api/friendship_activations",
      type: "post",
      dataType: "json",
      data: {friendship_id: friendshipId},
      success: function () {
        console.log("accepted friend");
        that.remove();
      }
    })
	},


});
