ShelfLife.Views.BookShow = Backbone.View.extend({

  template: JST['books/show'],

  tagName: "section",


  initialize: function () {
    this.listenTo(this.model, 'sync', this.render2);
  },

  render: function (){
  
    var content = this.template({book: this.model});

    this.$el.html(content);
    return this;
  },


  render2: function (){
    debugger
    var content = this.template({book: this.model});

    this.$el.html(content);
    return this;
  },


});
