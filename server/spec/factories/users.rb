FactoryBot.define do
  factory :user do
    account { nil }
    full_name { "MyString" }
    bio { "MyText" }
    goals { "MyText" }
    image_url { "MyString" }
  end
end
