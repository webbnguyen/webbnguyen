Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, "459350593724-gctiv2nj7augukbbkso8eu3bqs1c4mru.apps.googleusercontent.com" , "d_y9TGAOLEP2eiqG1qybQ0vw", scope: 'userinfo.email, userinfo.profile'
end

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, "132614700643714", "8142659b84a344a7d457a54d14302cb0", 
    client_options: {
      site: "https://graph.facebook.com/v2.4",
      authorize_url: "https://www.facebook.com/v2.4/dialog/oauth"
    },
    token_params: {
      parse: :json
    },
    scope: "email",
    info_fields: 'name, email'
end


