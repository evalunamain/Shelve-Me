ShelveMe.Collections.Friendships = Backbone.Collection.extend({
  url: 'api/friendships',

  model: ShelveMe.Models.Friendship,

  getOrFetch: function (id){
    var friendship = this.get(id);
    var friendships = this;

    if (!friendship) {
      friendship = new ShelveMe.Models.Book({id: id});
      friendship.fetch({
        success: function (){
          friendships.add(friendship);
        }
      });
    } else {
      friendship.fetch();
    }

    return friendship;
  }

});
