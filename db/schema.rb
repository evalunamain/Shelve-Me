# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150108230349) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "authors", force: true do |t|
    t.text     "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "authors", ["name"], name: "index_authors_on_name", using: :btree

  create_table "books", force: true do |t|
    t.text     "cover"
    t.text     "title"
    t.text     "isbn"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "submitter_id"
    t.integer  "author_id"
    t.text     "description",  null: false
  end

  add_index "books", ["isbn"], name: "index_books_on_isbn", unique: true, using: :btree
  add_index "books", ["title"], name: "index_books_on_title", using: :btree

  create_table "friendships", force: true do |t|
    t.integer  "user_id",                          null: false
    t.integer  "friend_id",                        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "accepted",         default: false, null: false
    t.string   "activation_token"
  end

  create_table "shelved_books", force: true do |t|
    t.integer  "shelf_id"
    t.integer  "book_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "shelved_books", ["book_id"], name: "index_shelved_books_on_book_id", using: :btree
  add_index "shelved_books", ["shelf_id"], name: "index_shelved_books_on_shelf_id", using: :btree

  create_table "shelves", force: true do |t|
    t.text     "title",      default: "to-read"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "shelves", ["title"], name: "index_shelves_on_title", using: :btree
  add_index "shelves", ["user_id"], name: "index_shelves_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "name",            null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
