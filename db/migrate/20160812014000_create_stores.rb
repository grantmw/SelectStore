class CreateStores < ActiveRecord::Migration
  def change
    create_table :stores do |t|
    	t.string :city
		t.string :x_coord
		t.string :y_coord
		t.string :country_code
		t.string :postal_code
		t.string :state
		t.string :street_1
		t.string :to_search_s
		t.timestamps null: false
    end
  end
end
