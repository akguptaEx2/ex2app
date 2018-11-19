
exports.up = function(knex, Promise) {
  return knex.schema.table('users',function(table){
    table.string('role',20).defaultTo('user');
  });
};

exports.down = function(knex, Promise) {
  
};
