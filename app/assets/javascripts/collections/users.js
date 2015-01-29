ShelveMe.Collections.Users = Backbone.Collection.extend({
  url: "api/users",

  model: ShelveMe.Models.User,

  comparator: "name",

  getOrFetch: function (id) {
    var user = this.get(id);
    var users = this;

    if (!user) {
      user = new ShelveMe.Models.User({id: id});
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

ShelveMe.Collections.users = new ShelveMe.Collections.Users
