ShelfLife.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',

  friends: function(){
    if (!this._friends) {
      this._friends = new ShelfLife.Collections.Users()
    }

    return this._friends
  },

  parse: function (response) {
    if (response.friends) {
      this.friends().set(response.friends, {parse: true})
    }

    return response;
  },

  isFriend: function (user){

    var friend = this.friends().get(user.id);

    return !!friend
  }
});
