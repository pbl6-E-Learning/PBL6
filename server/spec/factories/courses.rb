FactoryBot.define do
  factory :course do
    category { nil }
    title { "MyString" }
    level { "MyString" }
    description { "MyText" }
    teacher { nil }
  end
end
