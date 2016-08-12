class StoresController < ApplicationController
	def index
		stores = Store.all
		render json: stores.to_json, status: :created
	end
end
