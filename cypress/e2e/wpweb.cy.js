require('dotenv').config();
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

client.messages
  .create({
    from: process.env.TWILIO_WHATSAPP_FROM,
    to: process.env.TWILIO_WHATSAPP_TO,
    body: 'Merhaba! Twilio WhatsApp API test mesajı gönderildi 🎉'
  })
  .then(message => console.log('WhatsApp mesajı gönderildi:', message.sid))
