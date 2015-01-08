class AddAcceptionStatusToFriendships < ActiveRecord::Migration
  def change
    add_column :friendships, :accepted, :boolean, null: false, default: false
    add_column :friendships, :token, :string
  end
end
