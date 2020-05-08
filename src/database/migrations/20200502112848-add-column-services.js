module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('profiles', 'skills', {
      type: Sequelize.ENUM(
        'merchant',
        'service',
        'Barba completa na cera',
        'Barba completa',
        'Barba desenhada na cera',
        'Bigode na máquina',
        'Coloração',
        'Corte feminino',
        'Corte masculino',
        'Escova',
        'Escova progressiva',
        'Hidratação',
        'Coloração de sobracelhas',
        'Sobrancelha',
        'Sobrancelha com henna',
        'Sabrancelha com linha',
        'Bronzeamento artificial',
        'Carboxiterapia',
        'Criolipólise',
        'Drenagem Linfática',
        'Hidratação corporal'
      ),
      allowNull: true,
      trim: true,
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('profiles');
  },
};
