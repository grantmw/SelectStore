class UsersController < ApplicationController

	def show
		p params
		user = User.find(params["id"])
		render json: user, status: :created
	end

	def update
		store = Store.find(params[???])
		user = User.find(params["id"])
		user.store_id = store.id
		user.save
	end

end
