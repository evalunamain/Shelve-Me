ShelfLife.Collections.Users = Backbone.Collection.extend({
  url: 'api/users',

  model: ShelfLife.Models.User,

  comparator: "name",

  getOrFetch: function (id){
    var user = this.get(id);
    var users = this;

    if (!user) {
      user = new ShelfLife.Models.User({id: id});
      user.fetch({
        success: function (){
          users.add(user);
        }
      });
    } else {
      user.fetch();
    }
		
    return user;
  }

});

ShelfLife.Collections.users = new ShelfLife.Collections.Users
