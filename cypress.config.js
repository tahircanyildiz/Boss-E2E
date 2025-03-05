const { defineConfig } = require("cypress");
const dotenv = require("dotenv");

dotenv.config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.EMAIL = process.env.EMAIL;
      config.env.PASSWORD = process.env.PASSWORD;
      config.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY;


      return config;
    },
  },
});
