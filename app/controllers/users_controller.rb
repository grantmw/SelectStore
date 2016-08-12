class UsersController < ApplicationController

	def show
		p params
		user = User.find(params["id"])
		render json: user, status: :created
	end

	def update
		store = Store.find_by(to_search_s: params["storeSearchString"])
		user = User.find(params["id"])
		if user
			user.store_id = store.id
			user.save
		end
	end

end
