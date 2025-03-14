require('dotenv').config();
const fs = require('fs');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');


async function sendEmail() {

    try {
       
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.TO_EMAIL,
            subject: 'TXT Dosyası PDF Olarak Gönderildi',
            text: 'Merhaba, ekli PDF dosyası, önceden oluşturduğun TXT dosyanın dönüştürülmüş halidir.',
    
        };

        // E-posta gönder
        const info = await transporter.sendMail(mailOptions);
        console.log('E-posta gönderildi:', info.response);
    } catch (error) {
        console.error('Hata oluştu:', error);
    }
}

// Fonksiyonu çalıştır
sendEmail();
