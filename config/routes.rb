Rails.application.routes.draw do
  post '/rate' => 'rater#create', :as => 'rate'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get "/auth/google_oauth2/callback" => "plugins/ecommerce/front#google_login"
  get "/auth/facebook/callback" => "plugins/ecommerce/front#facebook_login"
  get "/ecommerce/confirm_email" => "plugins/ecommerce/front#confirm_email"
end
