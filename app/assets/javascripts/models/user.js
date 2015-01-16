ShelfLife.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',

  parse: function (response) {

    if (response.favorite_book) {
      this.favorite_book().set(response.favorite_book, {parse: true});
      delete response.favorite_book
    }

    if (response.books) {
      this.books().set(response.books, {parse: true});
      delete response.books
    }

    if (response.shelves) {
      this.shelves().set(response.shelves, {parse: true});
      delete response.shelves
    }

    if (response.reviews) {
      this.reviews().set(response.reviews, {parse: true})
      delete response.reviews
    }

    if (response.ratings) {
      this.ratings().set(response.ratings, {parse: true})
      delete response.ratings
    }

    if (response.friendships) {
      this.friendships().set(response.friendships, {parse: true});
      delete response.friendships
    }

    if (response.friends) {
      this.friends().set(response.friends, {parse: true});
      delete response.friends
    }

    if (response.accepted_friends) {
      this.acceptedFriends().set(response.accepted_friends, {parse: true});
      delete response.accepted_friends
    }

    if (response.pending_friendships) {
      this.pending_friendships().set(response.pending_friendships, {parse: true});
      delete response.pending_friendships
    }

    if (response.accepted_friendships) {
      this.accepted_friendships().set(response.accepted_friendships, {parse: true});
      delete response.accepted_friendships
    }

    if (response.friendship_requests) {
      this.friendship_requests().set(response.friendship_requests, {parse: true});
      delete response.friendship_requests
    }

    return response;
  },

  favorite_book: function () {
    if (!this._favorite_book) {
      this._favorite_book = new ShelfLife.Models.Book()
    }

    return this._favorite_book;
  },

  books: function () {
    if (!this._books) {
      this._books = new ShelfLife.Collections.Books()
    }

    return this._books;
  },

  shelves: function () {
    if (!this._shelves) {
      this._shelves = new ShelfLife.Collections.Shelves()
    }

    return this._shelves;
  },

  reviews: function () {
    if (!this._reviews) {
      this._reviews = new ShelfLife.Collections.Reviews()
    }
    return this._reviews
  },

  ratings: function () {
    if (!this._ratings) {
      this._ratings = new ShelfLife.Collections.Ratings()
    }

    return this._ratings
  },

  friendships: function (){
    if (!this._friendships) {
      this._friendships = new ShelfLife.Collections.Friendships()
    }

    return this._friendships
  },

  friends: function (){
    if (!this._friends) {
      this._friends = new ShelfLife.Collections.Users()
    }

    return this._friends
  },

  acceptedFriends: function (){
    if (!this._accepted_friends) {
      this._accepted_friends = new ShelfLife.Collections.Users()
    }

    return this._accepted_friends
  },

  accepted_friendships: function (){
    if (!this._accepted_friendships) {
      this._accepted_friendships = new ShelfLife.Collections.Friendships()
    }

    return this._accepted_friendships
  },

  pending_friendships: function (){
    if (!this._pending_friendships) {
      this._pending_friendships = new ShelfLife.Collections.Friendships()
    }

    return this._pending_friendships
  },

  friendship_requests: function () {
    if (!this._friendship_requests) {
      this._friendship_requests = new ShelfLife.Collections.Friendships()
    }

    return this._friendship_requests;
  },


  isFriend: function (user){

    var friend = this.friends().get(user.id);

    return !!friend
  }
});
