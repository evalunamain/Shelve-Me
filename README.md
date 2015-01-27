Shelve Me
==========
A place where readers can connect with each other and organize their books. 
Using Amazon's API, users can add books to the database by entering an ISBN10. The book's information is pulled from Amazons server and it's title, author, description and cover attributes are all set in one go. 

Sheve Me uses Backbone.js for its client-side MVC and Rails for its back-end. The Backbone views need data across different models. A combination of eager loading and deeply nested JSON data ensure a fluid information flow from back-end to front-end and prevent unnecessary database requests.

When data changes, the page updates immediately. Relying on a composite view pattern and granular rendering, small parts of the page can be re-rendered individually.

Users can rate books and leave reviews. Using jQuery, users can edit their own reviews by double-clicking them. They save on enter.

