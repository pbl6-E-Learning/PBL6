Account.create!(
  email: "admin@mail.com",
  password: "admin123",
  roles: 2
)

50.times do
  account = Account.create!(
    email: Faker::Internet.unique.email,
    password: "password",
    roles: 0
  )

  account.create_user!(
    full_name: Faker::Name.name,
    bio: Faker::Lorem.paragraph(sentence_count: 2),
    goals: Faker::Lorem.paragraph(sentence_count: 2),
    image_url: "https://i.pinimg.com/1200x/ff/c2/dd/ffc2ddb4e8a9074262ca5192f8d86ee1.jpg"
  )
end
