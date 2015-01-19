window.ShelveMe = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new ShelveMe.Routers.Router({
      $rootEl: $('#main')
    });

    if (this.userId) {
      this.currentUser = new ShelveMe.Models.User({id :this.userId});
      this.currentUser.fetch();
    }

    Backbone.history.start()
  }

};

$(document).ready(function(){
  ShelveMe.initialize();
});
