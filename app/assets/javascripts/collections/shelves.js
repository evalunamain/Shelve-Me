ShelfLife.Collections.Shelves = Backbone.Collection.extend({
  url: 'api/shelves',

  model: ShelfLife.Models.Shelf,

  comparator: "title",

  getOrFetch: function (id){
    var shelf = this.get(id);
    var shelves = this;

    if (!shelf) {
      shelf = new ShelfLife.Models.Shelf({id: id});
      shelf.fetch({
        success: function (){
          shelves.add(shelf);
        }
      });
    } else {
      shelf.fetch();
    }
		
    return shelf;
  }

});