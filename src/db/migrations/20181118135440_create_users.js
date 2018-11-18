
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.increments();
        table.string('username', 20).notNullable();
        table.unique('username');
        table.string('email',40).notNullable().unique();
        table.string('first_name',20).notNullable();
        table.string('last_name',20).notNullable();
        table.string('team',20).notNullable();
        table.string('password',255).notNullable();
        table.timestamps(true,true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
};
