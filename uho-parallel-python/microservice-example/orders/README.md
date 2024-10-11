# how to migrate?
bundle exec sequel -m ./db/migrations sqlite://db/users.db --echo

# how to run?
bundle exec rackup --host 0.0.0.0 --port 4567