ShelveMe.Views.UsersForm = Backbone.View.extend({

  initialize: function (options) {
    this.listenTo(this.model, "sync change", this.render);
  },

  template: JST["users/new"],

  events: {
    "submit form": "submit",
    "blur .error": "removeErrorClass"
  },

  render: function () {
    var html = this.template({ user: this.model, errors: this.errors });
    this.$el.html(html);

    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var $form = $(event.currentTarget),
      userData = $form.serializeJSON().user,
      that = this;

    this.model.save(userData, {
      success: function () {
        ShelveMe.currentUser.fetch();
        that.collection.add(that.model, {merge: true});
        Backbone.history.navigate("", {trigger: true});
      },

      error: function (data, response) {
        var errors = response.responseJSON;

        errors.forEach( function (error){
          if (error.indexOf("Name") >= 0) {
            var el = that.$("#name");
            el.attr("placeholder", error)
              .addClass("error");
        } else if (error.indexOf("Password") >= 0) {
            var el = that.$("#password");
            el.attr("placeholder", error)
              .addClass("error");
        } else if (error.indexOf("Email") >= 0) {
            var el = that.$("#email");
            el.attr("placeholder", error)
              .addClass("error");
        }
      });
      }
    });
  },

  removeErrorClass: function (event) {
    event.preventDefault();
    $(event.currentTarget).removeClass("error");
  }

});
