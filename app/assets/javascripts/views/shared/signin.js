ShelveMe.Views.SignIn = Backbone.View.extend({

  initialize: function(options){
    this.callback = options.callback;
    this.listenTo(ShelveMe.currentUser, "signIn", this.signInCallback);
  },

  events: {
    "submit form": "submit",
    "click .demo-user": "preFill"
  },

  template: JST["shared/sign_in"],

  render: function(){
    this.$el.html(this.template());
    return this;
  },

  submit: function(event){
    event.preventDefault();
    var $form = $(event.currentTarget),
      formData = $form.serializeJSON().user;

    ShelveMe.currentUser.signIn({
      email: formData.email,
      password: formData.password,
      error: function(){
        alert("Wrong username/password combination. Please try again.");
      }
    });
  },

  signInCallback: function(event){
    if (this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("", { trigger: true });
    }
  },

  preFill: function () {
    var $email = this.$("#email"),
      $password = this.$("#password");

    $email.val("demo@mail.com");
    $password.val("testtest");
  }

});
