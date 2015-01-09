json.extract! @user, :id, :name, :email

json.friends @user.friends, :id, :name, :email

json.pending_friends @user.pending_friends, :id, :name, :email

json.accepted_friends @user.accepted_friends, :id, :name, :email

json.requesting_friends @user.requesting_friends, :id, :name, :email
