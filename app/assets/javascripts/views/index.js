ShelfLife.Views.indexView = Backbone.View.extend({

  template: JST['index'],

  // tagName: "li",

  initialize: function (options) {
    // this.friend = this.model.friend();
  },

  render: function (){
		console.log('accept rendering');

    var content = this.template({

		});

    this.$el.html(content);
    return this;
  },


});
