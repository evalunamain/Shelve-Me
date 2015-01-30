ShelveMe.Views.Header = Backbone.View.extend({

  initialize: function (options) {
    this.listenTo(ShelveMe.currentUser, "signIn signOut", this.render);
    this.render();
  },

  events: {
    "click #sign-out-link": "signOut"
  },

  template: JST["shared/header"],

  render: function () {
    var html = this.template({currentUser: ShelveMe.currentUser});
    this.$el.html(html);

    return this;
  },

  signOut: function (event) {
    event.preventDefault();

    ShelveMe.currentUser.signOut({
      success: function(){
        Backbone.history.navigate("session/new", {trigger: true});
      }
    });
  }

});
