ShelfLife.Collections.Friendships = Backbone.Collection.extend({
  url: 'api/friendships',

  model: ShelfLife.Models.Friendship,

  getOrFetch: function (id){
    var friendship = this.get(id);
    var friendships = this;

    if (!friendship) {
      friendship = new ShelfLife.Models.Book({id: id});
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
