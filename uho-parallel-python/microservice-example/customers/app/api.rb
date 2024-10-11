require 'sinatra'
require 'sequel'
require 'sqlite3'
require 'json'
require 'time'

module CustomerService
  class API < Sinatra::Base
    # Initialize SQLite database
    DB = Sequel.sqlite("./db/customers.db")

    # Add a user to the database
    post '/customers' do
      user_param = JSON.parse(request.body.read)
      user_param['created_at'] = Time.now
      user_param['updated_at'] = Time.now

      res = DB[:customers].insert(user_param)
      id = DB[:customers].max(:id)

      if res
        status 201
        JSON.generate('success'=>true,'user_id' => id,"created_at"=> Time.now)
      else
        status 500
        JSON.generate('success'=>false,'error' => res)
      end
    end

    # Get user by ID
    get '/customers/:id' do
      id = params['id']
      user = DB[:customers].where(id: id).first
      if user
        content_type :json
        { id: user[:id], name: user[:name], email: user[:email], created_at: user[:created_at] }.to_json
      else
        status 404
        { error: "Customer not found" }.to_json
      end
    end

  end
end
