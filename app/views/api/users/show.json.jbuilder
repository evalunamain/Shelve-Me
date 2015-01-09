json.extract! @user, :id, :name, :email

json.friends @user.friends, :id, :name, :email
