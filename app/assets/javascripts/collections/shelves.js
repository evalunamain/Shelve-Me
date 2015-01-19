ShelveMe.Collections.Shelves = Backbone.Collection.extend({
  url: 'api/shelves',

  model: ShelveMe.Models.Shelf,

  comparator: "title",

  getOrFetch: function (id){
    var shelf = this.get(id);
    var shelves = this;

    if (!shelf) {
      shelf = new ShelveMe.Models.Shelf({id: id});
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

ShelveMe.Collections.shelves = new ShelveMe.Collections.Shelves;
