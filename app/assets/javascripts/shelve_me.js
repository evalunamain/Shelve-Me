window.ShelveMe = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.currentUser = new ShelveMe.Models.CurrentUser();
    this.currentUser.fetch();

    this.header = new ShelveMe.Views.Header({el: "#header"});
    this.router = new ShelveMe.Routers.Router({
      $rootEl: $('#main')
    });

    Backbone.history.start()
  }

};

$(document).ready(function(){
  ShelveMe.initialize();
});
