const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
  },
  env: {
    login_email: 'user-nttd@nttd.com',
    login_password: 'nttd',
    login_wrong_password: '12345'
  }

});
