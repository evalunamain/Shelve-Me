ShelfLife.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',

  parse: function (response) {
    if (response.friends) {
      this.friends().set(response.friends, {parse: true});
      delete response.friends
    }

    // if (response.pending_friends) {
    //   this.pending_friends().set(response.pending_friends, {parse: true});
    //   delete response.pending_friends
    // }
    //
    // if (response.accepted_friends) {
    //   this.accepted_friends().set(response.accepted_friends, {parse: true});
    //   delete response.accepted_friends
    // }
    //
    // if (response.requesting_friends) {
    //   this.requesting_friends().set(response.requesting_friends, {parse: true});
    //   delete response.requesting_friends
    // }

    if (response.friendships) {
      this._friendships().set(response.friendships, {parse: true});
      delete response.friendships
    }

    return response;
  },

  friendships: function (){
    if (!this._friendships) {
      this._friendships = new ShelfLife.Collections.Friendships()
    }

    return this._friendships
  }

  friends: function (){
    if (!this._friends) {
      this._friends = new ShelfLife.Collections.Users()
    }

    return this._friends
  },

  accepted_friends: function (){
    if (!this._accepted_friends) {
      this._accepted_friends = new ShelfLife.Collections.Users()
    }

    return this._accepted_friends
  },

  pending_friends: function (){
    if (!this._pending_friends) {
      this._pending_friends = new ShelfLife.Collections.Users()
    }

    return this._pending_friends
  },

  requesting_friends: function () {
    if (!this._requesting_friends) {
      this._requesting_friends = new ShelfLife.Collections.Users()
    }

    return this._requesting_friends
  },

  isFriend: function (user){

    var friend = this.friends().get(user.id);

    return !!friend
  }
});
