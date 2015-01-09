ShelfLife.Views.BookShow = Backbone.View.extend({

  template: JST['books/show'],

  tagName: "section",


  initialize: function () {

    this.listenTo(this.model, 'sync', this.render);
  },

  render: function (){
    var content = this.template({book: this.model});

    this.$el.html(content);
    return this;
  },


});
