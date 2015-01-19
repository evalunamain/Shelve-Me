ShelveMe.Models.Friendship = Backbone.Model.extend({
  urlRoot: 'api/friendships',

  friend: function(){
    if (!this._friend) {
      this._friend = new ShelveMe.Models.User()
    }

    return this._friend
  },

  parse: function (response) {
    if (response.friend) {
      this.friend().set(response.friend, {parse: true});
      delete response.friend;
    }

    return response;
  }
});
