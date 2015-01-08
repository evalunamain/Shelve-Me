class ShelvedBook < ActiveRecord::Base
  belongs_to :shelf
  belongs_to :book
end
