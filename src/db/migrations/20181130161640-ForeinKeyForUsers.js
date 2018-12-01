'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint('UserRoles',['user_id'],{
        type:'foreign key',
        name:'user_id_fk',
        references:{
          table: 'Users',
          field:'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),

      queryInterface.addConstraint('UserRoles',['role_id'],{
        type:'foreign key',
        name:'role_id_fk',
        references:{
          table: 'Roles',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
    ]);  
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
