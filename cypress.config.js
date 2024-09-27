const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    //baseUrl: 'https://serverest.dev',
  },
  env: {
    login_email: 'teste@teste.com',
    login_password: '12345'
  }

});
