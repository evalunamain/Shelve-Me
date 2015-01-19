ShelveMe.Views.friendRequestView = Backbone.View.extend({

  template: JST['users/friend-request'],

  tagName: "li",

  initialize: function (options) {
	  this.friend = this.model.friend();
    this.user = options.user;
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

  render2: function (){
    console.log('synced request rendering');
    this.friend = this.model.friend();
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
        that.remove();
        console.log("accepted friend");
        that.user.fetch();
      }
    })
	},

  ignoreFriend: function (event) {
    console.log("ignoring friend");
    event.preventDefault();
  }


});
