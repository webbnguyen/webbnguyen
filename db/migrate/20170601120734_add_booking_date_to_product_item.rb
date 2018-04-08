class AddBookingDateToProductItem < ActiveRecord::Migration[5.0]
  def change
    add_column "plugins_ecommerce_products", :booking_date, :datetime
  end
end
