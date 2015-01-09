window.ShelfLife = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new ShelfLife.Routers.Router({
      $rootEl: $('#main')
    });

    if (this.userId) {
      this.currentUser = new ShelfLife.Models.User({id :this.userId});
      this.currentUser.fetch();
    }

    Backbone.history.start()
  }

};

$(document).ready(function(){
  ShelfLife.initialize();
});
