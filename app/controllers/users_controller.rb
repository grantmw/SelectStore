class UsersController < ApplicationController
	def show
		user = User.find(params[:id])
		render json: user, status: :created
	end

	def update
		store = Store.find_by(to_search_s: params[:storeSearchString])
		user = User.find(params[:id])
		user.update(store_id: store.id)
		render json: store.to_json, status: :created
	end
end
