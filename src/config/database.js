module.exports = {
  dialect: 'postgres',
  host: '192.168.99.100',
  username: 'UserMain',
  password: 'docker',
  database: 'goprittier',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
