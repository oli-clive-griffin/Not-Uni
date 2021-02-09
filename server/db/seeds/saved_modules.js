exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('saved_modules').del()
    .then(function () {
      // Inserts seed entries
      return knex('saved_modules').insert([
        { id: 1, user_id: "p36bBusqTjPJEjxDr30NgtOQGwq1", module_id: '101' },
        { id: 2, user_id: "VV02oaNrCbUW1m5U7Ui7gwj8o6O2", module_id: '101' },
        { id: 3, user_id: "p36bBusqTjPJEjxDr30NgtOQGwq1", module_id: '102' },
        { id: 4, user_id: "VV02oaNrCbUW1m5U7Ui7gwj8o6O2", module_id: '102' },
        { id: 5, user_id: "p36bBusqTjPJEjxDr30NgtOQGwq1", module_id: '103' },
        { id: 6, user_id: "VV02oaNrCbUW1m5U7Ui7gwj8o6O2", module_id: '103' },
        { id: 7, user_id: "p36bBusqTjPJEjxDr30NgtOQGwq1", module_id: '104' },
        { id: 8, user_id: "VV02oaNrCbUW1m5U7Ui7gwj8o6O2", module_id: '104' },
        { id: 9, user_id: "p36bBusqTjPJEjxDr30NgtOQGwq1", module_id: '105' },
        { id: 10, user_id: "VV02oaNrCbUW1m5U7Ui7gwj8o6O2", module_id: '105' },
        { id: 11, user_id: "p36bBusqTjPJEjxDr30NgtOQGwq1", module_id: '106' },
        { id: 12, user_id: 'MLPxg3mjBRMEKd4WAbS7vAzwkkk1', module_id: '108' },
        { id: 13, user_id: 'MLPxg3mjBRMEKd4WAbS7vAzwkkk1', module_id: '109' },
        { id: 14, user_id: 'MLPxg3mjBRMEKd4WAbS7vAzwkkk1', module_id: '110' },
        { id: 15, user_id: 'MLPxg3mjBRMEKd4WAbS7vAzwkkk1', module_id: '101' },
        { id: 16, user_id: 'MLPxg3mjBRMEKd4WAbS7vAzwkkk1', module_id: '102' },
        { id: 17, user_id: 'MLPxg3mjBRMEKd4WAbS7vAzwkkk1', module_id: '104' },
        { id: 18, user_id: 'MLPxg3mjBRMEKd4WAbS7vAzwkkk1', module_id: '105' },
      ])
    })
}


//bren "p36bBusqTjPJEjxDr30NgtOQGwq1"
//kelly "VV02oaNrCbUW1m5U7Ui7gwj8o6O2"
//ross  'MLPxg3mjBRMEKd4WAbS7vAzwkkk1'