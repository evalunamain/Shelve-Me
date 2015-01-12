ShelfLife.Views.UsersIndex = Backbone.CompositeView.extend({

  template: JST['users/index'],

  className: "index",

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
	

  },

  addUserView: function (user) {
    var userView = new ShelfLife.Views.UserItem({
      model: user
    });
    this.addSubview('ul.index', userView);
  },

  render: function (){
		console.log("in user show");
		console.log(this.collection.length);
		this.$el.empty();
    
    var content = this.template();
    this.$el.html(content);
		this.collection.each(this.addUserView.bind(this));
    // this.attachSubviews();
    return this;
  },
	
  render2: function (){
		console.log("in user show");
		this.$el.empty();
		debugger
    this.collection.each(this.addUserView.bind(this));
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },
	

});
