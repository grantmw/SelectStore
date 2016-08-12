class StoresController < ApplicationController
	def index
		stores = Store.all
		obj = {
			stores: stores
		}
		render json: obj, status: :created
	end
end
