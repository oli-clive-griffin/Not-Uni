exports.up = function (knex) {
  return knex.schema.createTable('saved_modules', table => {
    table.increments('id')
    table.string('user_id')
    table.integer('module_id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('saved_modules')
}
