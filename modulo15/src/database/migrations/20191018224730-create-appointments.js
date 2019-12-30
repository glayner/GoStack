module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      user_id: {
        // usuario que agenda
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }, // chave estrangeira
        onUpdate: 'CASCADE', // o que acontece caso o arquivo seja modificado
        onDelete: 'SET NULL', // ou deletado
        allowNull: true,
      },
      provider_id: {
        // provedor de serviço
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }, // chave estrangeira
        onUpdate: 'CASCADE', // o que acontece caso o arquivo seja modificado
        onDelete: 'SET NULL', // ou deletado
        allowNull: true,
      },
      canceled_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('appointments');
  },
};
