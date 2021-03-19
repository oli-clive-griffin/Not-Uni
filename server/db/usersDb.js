const connection = require('./connection')

// register a new user
function createUser (user, db = connection) {
  return userExists(user.user_name, db)
    .then(exists => {
      if (exists) {
        throw new Error('User already exists')
      }
      return null
    })
    .then(passwordHash => {
      return db('users').insert({ user_name: user.user_name, hash: passwordHash })
    })
}

// verify whether a user account already exists
function userExists (userName, db = connection) {
  return db('users')
    .count('id as n')
    .where('user_name', userName)
    .then(count => {
      return count[0].n > 0
    })
}

// use a user's existing data / profile
function getUserByName (userName, db = connection) {
  return db('users')
    .select()
    .where('user_name', userName)
    .first()
}

module.exports = {
  createUser,
  getUserByName,
  userExists,
}
