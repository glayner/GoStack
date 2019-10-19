module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', // tabela que vai adicionar a coluna
      'avatar_id', // nome da coluna
      {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' }, // chave estrangeira
        onUpdate: 'CASCADE', // o que acontece caso o arquivo seja modificado
        onDelete: 'SET NULL', // ou deletado
        allowNull: true,
      }
    );
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
