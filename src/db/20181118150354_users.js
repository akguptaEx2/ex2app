
exports.up = function(knex, Promise) {
  knex.schema.alterTable('users',function(table){
      table.timestamps(true,true);
  });
};

exports.down = function(knex, Promise) {
  
};
