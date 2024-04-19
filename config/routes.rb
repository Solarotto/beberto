Rails.application.routes.draw do
  get 'bberto/show'


  root "home#index"

  get 'bberto', to: 'bberto#show'
end
