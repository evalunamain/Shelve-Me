ASIN::Configuration.configure do |config|
  config.secret        = ENV["aws_secret"]
  config.key           = ENV["aws_access_key"]
  config.associate_tag = ENV["aws_associate_tag"]
end
