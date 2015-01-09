window.ShelfLife = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new ShelfLife.Routers.Router({
      $rootEl: $('#main')
    })
    Backbone.history.start()
  }
};

$(document).ready(function(){
  ShelfLife.initialize();
});
