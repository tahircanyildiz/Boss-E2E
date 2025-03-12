import { faker } from '@faker-js/faker';
import { MailSlurp } from "mailslurp-client";

import 'cypress-file-upload';

const randomName = faker.person.fullName();
const randomPhone = `+90${faker.number.int({ min: 5000000000, max: 5999999999 })}`;
const randomPassword = faker.internet.password(12, true, /\w/, '@!'); 
Cypress.env('password', randomPassword);
describe('Kullanıcı giriş testi', () => {
    let mailslurp;
    let emailAddress;
    let inboxId;
    before(() => {
        mailslurp = new MailSlurp({ apiKey:'bffd2ca11c3f43e0b7ef0bc6b7f34f8461e7d81650e27a43f954dfd8c7a6654e'});
    
        return mailslurp.createInbox().then(inbox => {
          inboxId = inbox.id;
          emailAddress = inbox.emailAddress;
    
        });
      });
    beforeEach(() => {
        cy.viewport(1920, 1080);
    });
    it('Kullanıcı başarıyla kayıt olur ve giriş yapar', () => {
        cy.visit("https://portal.bossai.app/");
        cy.wait(500)


        //kayıt ol ekranını aç
        cy.get('a[href="/SignUp"]').click();
        cy.wait(3000);

        // ismi gir
        cy.get('#fullname').click().type(randomName,{delay:100});
        cy.wait(500);
        //telefon no gir
        cy.get('#phone').click().type(randomPhone,{delay:100});
        cy.wait(500);
        //email gir
        cy.get('#email').click().type(emailAddress,{delay:100});
        cy.wait(500);
        //password gir
        cy.get('#password').click().type(Cypress.env('password'),{delay:50});
        cy.wait(500);
        //password doğrula
        cy.get('#confirmPassword').click().type(Cypress.env('password'),{delay:50});
        cy.wait(500);
        //sözleşme kabul et
        cy.get('#agree-terms').click();
        cy.wait(500);
        // kayıt ol butonuna tıkla
        cy.get('button[type=\'submit\'] span').click();
        cy.wait(5000);

        // mail password bilgilerini metin belgesine yaz
        cy.writeFile('cypress/fixtures/userData.txt', `\n Email: ${emailAddress}\nPassword: ${Cypress.env('password')}\n`, { flag: 'a+' });

        //pop up kapat
        cy.contains('button', 'OK').click();
        cy.document().its('readyState').should('eq', 'complete');
        //bilgilendirme ekranlarını atla
        cy.get("body > div:nth-child(1) > div:nth-child(1) > main:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > button:nth-child(3)").click();
        cy.wait(1000);
        cy.get("body > div:nth-child(1) > div:nth-child(1) > main:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > button:nth-child(3)").click();
        cy.wait(1000);
        cy.get("body > div:nth-child(1) > div:nth-child(1) > main:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > button:nth-child(3)").click();
        cy.wait(1000);


        //asistan olarak robotu seç
        cy.contains('button', 'Dijital').find('span').click();
        cy.wait(500);
        //kaydet
        cy.get("button[class='relative inline-flex items-center justify-center w-full px-4 py-2 font-medium rounded-md transition-all duration-200 min-w-[100px] min-h-[40px] border border-none focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 bg-gradient-to-l from-[#4000F0] to-[#6400A1]']").click();
        cy.wait(1000);
        //erkek sesi seç
        cy.get("body div[id='app'] div[class='w-full min-h-screen'] main div[class='min-h-screen bg-white flex items-center justify-center p-4'] div[class='max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden'] div[class='relative overflow-hidden'] div[class='relative w-full'] div[class='p-6'] div[class='space-y-4'] button:nth-child(1)").click();
        //kaydet
        cy.get("body > div:nth-child(1) > div:nth-child(1) > main:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > button:nth-child(1)").click();
        cy.wait(1000);
        //asistan ismini gir
        cy.get("input[placeholder='Alexa']").click().type("Tahir Paşa'nın Kölesi",{delay:100});
        //kaydet ve hesabı oluştur.
        cy.get("body > div:nth-child(1) > div:nth-child(1) > main:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > button:nth-child(1)").click();
        cy.wait(10000);

        //çıkış yap
        cy.get(".w-5.h-5.text-red-600").click();
        cy.wait(1000);
        cy.get("button[class='swal2-confirm swal2-styled swal2-default-outline']").click();
        cy.wait(1500);

        //giriş yap
        //email
        cy.get('input[placeholder="E-posta adresinizi girin"]').click().type(emailAddress, { delay: 100 });
        cy.wait(500)

        //sifre
        cy.get('input[placeholder="Şifrenizi girin"]').click().type(randomPassword, { delay: 100 });
        cy.wait(500)

        //giris
        cy.get('div#app button[type="submit"]').click();
        cy.wait(5000)

        cy.get('div#app p.text-sm.font-medium.text-gray-700').should('have.text', randomName);





    });

});