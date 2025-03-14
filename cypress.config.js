const { defineConfig } = require("cypress");
const dotenv = require("dotenv");
const fs = require('fs');
const { Document, Packer, Paragraph } = require('docx');
dotenv.config();
const axios = require('axios');
const FormData = require('form-data');


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.EMAIL = process.env.EMAIL;
      config.env.PASSWORD = process.env.PASSWORD;
      config.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY;
      config.env.TELEGRAM_API_KEY=process.env.TELEGRAM_API_KEY;
      config.env.CHAT_ID=process.env.CHAT_ID;


      on('task', {
        writeDocx(results) {
          const doc = new Document({
            sections: [
              {
                properties: {},
                children: results.flatMap(result => [
                  new Paragraph(`Soru: ${result.question}`),
                  new Paragraph(`Cevap: ${result.answer}`),
                  new Paragraph(`Durum: ${result.isCorrect}`),
                  new Paragraph('') // Boş satır ekleyerek aralarına boşluk bırakıyoruz.
                ]),
              },
            ],
          });

          return new Promise((resolve, reject) => {
            Packer.toBuffer(doc).then((buffer) => {
              fs.writeFileSync('cypress/fixtures/DbSoruCevap.docx', buffer);
              resolve(true);
            }).catch(reject);
          });
        },
        sendTelegramFile({ botToken, chatId, filePath }) {
          return new Promise((resolve, reject) => {
          
            const formData = new FormData();
            formData.append('chat_id', chatId);
            formData.append('document', fs.createReadStream(filePath));
    
            // FormData başlıklarını manuel olarak ayarlıyoruz
            const headers = {
              'Content-Type': 'multipart/form-data', 
              ...formData.getHeaders(),
            };
    
            axios.post(`https://api.telegram.org/bot${botToken}/sendDocument`, formData, {
              headers: headers,
            })
              .then(response => {
                resolve(response.data);
              })
              .catch(error => {
                reject(error);
              });
          });
        }
      });
      
      return config;

    },
  },
});