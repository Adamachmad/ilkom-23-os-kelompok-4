require 'sinatra'

module ItemService
  class API < Sinatra::Base
    get '/' do
      'haiii'
    end
  end
end