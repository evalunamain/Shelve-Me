Shelf Life
==========
### Goodreads Clone.

A place for readers to connect with other readers, discuss books and find new reading material.

Use Ruby/Rails for underlying database structure and associations. Javascript/JQuery for user interaction and notifications. Backbone to manipulate the DOM, allow for more responsive views without having to reload an entire new page.

#### Phase I (MVP)
- user signup (authors and readers)
- users can add books (uniqueness based on ISBN)
- users can leave reviews of books
- users can rate books
- users can create bookshelves (read/to-read/currently-reading and personalized)
- users can become friends with other users

#### Phase II
- users can comment on and rate other reviews
- users can add quotes
- users can save quotes
- users can rate quotes

#### Phase III
- personalized book recommendations
- author program
- user groups
- user lists
- reading progress

###Database Schema

####User
- name
- email
- picture
- password digest
- session token

####Friends(join table)
- user id
- user id

####Books
- cover
- author
- title
- isbn

####Read books
- book id
- user id


####Reviews
- title
- description
- user id
- book id

####Ratings
- rating
- user id
- book id

####Quotes
- text
- book id
- submitter id

####Liked quotes(join table)
- user id
- quote id

