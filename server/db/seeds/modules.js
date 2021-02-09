exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('modules').del()
    .then(function () {
      // Inserts seed entries
      return knex('modules').insert([
        { id: 101, title: 'Intro To JavaScript', user_id: "VV02oaNrCbUW1m5U7Ui7gwj8o6O2", category: 'JavaScript', difficulty: 'Beginner', duration: 15, description: 'The Perfect Place to Start Learning About JavaScript', number_of_elements: 5, likes: 100 },
        { id: 102, title: 'Intro To C++', user_id: 'MLPxg3mjBRMEKd4WAbS7vAzwkkk1', category: 'C++', difficulty: 'Beginner', duration: 15, description: 'Learn the Basics of C++', number_of_elements: 5, likes: 20 },
        { id: 103, title: 'The Language of C# (CSharp)', user_id: 'MLPxg3mjBRMEKd4WAbS7vAzwkkk1', category: 'Csharp', difficulty: 'Beginner', duration: 15, description: "C# (CSharp) - Because C Wasn't Easy Enough", number_of_elements: 5, likes: 5 },
        { id: 104, title: 'Intro To Ruby', user_id: 'MLPxg3mjBRMEKd4WAbS7vAzwkkk1', category: 'Ruby', difficulty: 'Beginner', duration: 15, description: 'Ruby is a general-purpose language that is still popular and in high demand in the marketplace, as it’s more commonly used in Rails applications. Concise and readable, it is easy to pick up but also plenty powerful. Companies like Twitter, Soundcloud, Goodreads, and Kickstarter got their products off the ground with Ruby.', number_of_elements: 5, likes: 25 },
        { id: 105, title: 'Intro To Python', user_id: 'MLPxg3mjBRMEKd4WAbS7vAzwkkk1', category: 'Python', difficulty: 'Beginner', duration: 15, description: 'Python - more than just a snake', number_of_elements: 5, likes: 10 },
        { id: 106, title: 'JavaScript with React', user_id: "VV02oaNrCbUW1m5U7Ui7gwj8o6O2", category: 'JavaScript', difficulty: 'Beginner', duration: 15, description: 'Start Using React Now!', number_of_elements: 5, likes: 63 },
        { id: 107, title: 'JavaScript and Redux', user_id: "VV02oaNrCbUW1m5U7Ui7gwj8o6O2", category: 'JavaScript', difficulty: 'Beginner', duration: 15, description: 'Some great introductory resources for anyone interested in Redux', number_of_elements: 5, likes: 8 },
        { id: 108, title: 'How to do a Roundhouse Kick', user_id: "6rcXx192Qdd85K5Pxr3rSrryDKZ2", category: 'JavaScript', difficulty: 'Advanced', duration: 120, description: "Be the highlight of all your friend's parties", number_of_elements: 10, likes: 42068 },
        { id: 109, title: "CSS - It's Probably Time To Actually Learn It", user_id: "p36bBusqTjPJEjxDr30NgtOQGwq1", category: 'CSS', difficulty: 'Intermediate', duration: 45, description: "Learn how to make your blog or personal project POP", number_of_elements: 5, likes: 7 },
        { id: 110, title: "HTML - The Perfect Place to Start Your Journey", user_id: "p36bBusqTjPJEjxDr30NgtOQGwq1", category: 'HTML', difficulty: 'Beginner', duration: 30, description: "Tips and Tricks to Make HTML Easy", number_of_elements: 5, likes: 30 }
      ])
    })
}