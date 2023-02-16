module.exports = {
    apps : [{
      name: "DC - Creador de bots",
      script: 'index.js',
  //    max_restarts: 5,
      cron_restart: "0 0 * * *"
    }]
  };