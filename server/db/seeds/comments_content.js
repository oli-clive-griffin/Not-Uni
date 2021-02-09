exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('comments_content').del()
      .then(function () {
        // Inserts seed entries
        return knex('comments_content').insert([
          { id: 1, user_name: 'herobrine', module_id: '101', content: 'Really helpful and informative module, well layed out and full of useful information, thank you!'},
          { id: 2, user_name: 'herobrine', module_id: '102', content: 'Somehow this module allowed me to clarify and understand things that other, free information websites were unable to effectively teach me.'},
          { id: 3, user_name: 'herobrine', module_id: '103', content: 'Came here to learn how to do a Roundhouse Kick, now I also know how to use C'},
          { id: 4, user_name: 'herobrine', module_id: '104', content: "I've always wanted to learn Ruby, this module was perfect for figuring out that I don't want to learn Ruby."},
          { id: 5, user_name: 'herobrine', module_id: '105', content: 'This module was quick to clarify that Python is more than just a snake. I think that is were I got confused on other websites, but this module is very beginner friendly and forgiving'},
          { id: 6, user_name: 'herobrine', module_id: '106', content: 'A++ Trader, would trade again'},
          { id: 7, user_name: 'herobrine', module_id: '107', content: 'I never thought I would truly understand Redux, but this module has clarified so many things for me! Thank you so much!'},
          { id: 8, user_name: 'herobrine', module_id: '108', content: "I don't like that you're promoting violence by teaching people how to kick, I've never seen anyone peacfully kick anyone else, this content should be removed"},
          { id: 9, user_name: 'herobrine', module_id: '109', content: "I never felt like I would understand CSS. I still don't, but this was an entertaining read none the less"},
          { id: 10, user_name: 'herobrine', module_id: '101', content: 'Exactly the information I needed in the perfect layout, excellent module'},
          { id: 11, user_name: 'herobrine', module_id: '108', content: 'This video changed my life. Now I make $10,000 a year doing Roundhouse kicks'},
          { id: 12, user_name: 'herobrine', module_id: '108', content: 'This is by far the most useful piece of information currently on the internet'},
          { id: 13, user_name: 'herobrine', module_id: '108', content: "Don't try this at home, I pulled my groin muscle and now I can't walk."},
  
        ])
      })
  }
