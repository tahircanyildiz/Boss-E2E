import { faker } from '@faker-js/faker';

describe("Boss Giriş Testi", () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
    });
    it("Boss başarılı giriş yapar", () => {
        const randomName = faker.person.fullName();
        const randomEmail = faker.internet.email();
        const randomPhone = `+90${faker.number.int({ min: 5000000000, max: 5999999999 })}`;
        const email = Cypress.env('EMAIL');
        const password = Cypress.env('PASSWORD');

        cy.visit("https://portal.bossai.app/");
        cy.wait(500)

        //email
        cy.get('div#app div.mb-4 > div > div > input').click().type(email, { delay: 100 });
        cy.wait(500)

        //sifre
        cy.get('input[placeholder="Şifreniz"]').click().type(password, { delay: 100 });
        cy.wait(500)

        //giris
        cy.get('.px-4').click();
        cy.wait(5000)

        // //ayarlar
        cy.get('div#app div:nth-child(4) > div > div > div > img').click();
        cy.wait(1500)

        //profil ayarları
        cy.get('div#app div.fixed.bg-white.rounded-lg.shadow-lg.overflow-hidden.z-30 > div > div:nth-child(1)').click();
        cy.wait(900)

        //isim
        cy.get('input[placeholder="İsim Soyisim"]').click().clear().type(randomName, { delay: 150 });
        cy.wait(500)

        //numara
        cy.get('input[placeholder="Telefon Numarası"]').click().clear().type(randomPhone, { delay: 150 });
        cy.wait(500)

        //mail
        cy.get('input[placeholder="E-posta adresiniz"]').click().clear().type(randomEmail, { delay: 150 });
        cy.wait(900)

        //ayarları kaydet
        cy.get('div#app span').click();
        cy.wait(2000)

        cy.get('.swal2-confirm').click();
        cy.wait(900)

        //mail ve ismi kontrol et
        cy.get('div#app p.text-sm.font-medium.text-gray-700').should('have.text', randomName);
        cy.get('div#app p.text-xs.text-gray-500').should('have.text', randomEmail);


        //ayarlar
        cy.get('div#app div:nth-child(4) > div > div > div > img').click();
        cy.wait(1500)

        cy.get('div#app div.fixed.bg-white.rounded-lg.shadow-lg.overflow-hidden.z-30 > div > div:nth-child(2)').click();
        cy.wait(900)

        //asistan robot
        cy.get('div#app div.bg-white.rounded-2xl.shadow-sm.border.border-gray-100.overflow-hidden > div:nth-child(1) > div > button:nth-child(1)').click();
        cy.wait(900)

        //asistan erkek sesi
        cy.get('.py-1:nth-child(1)').click();
        cy.wait(900)

        //asistan erkek adı
        cy.get('input[placeholder="İsim Soyisim"]').click().clear().type("robot  erkek", { delay: 150 });
        cy.wait(900)

        cy.contains('button', 'Asistan Ayarlarını Kaydet').click();
        cy.wait(2000)

        cy.get('.swal2-confirm').click();
        cy.wait(1500)

        //robot asistan kadın
        cy.get('div#app div:nth-child(2) > div > button:nth-child(2)').click();
        cy.wait(900)

        cy.get('input[placeholder="İsim Soyisim"]').click().clear().type("robot  kadın", { delay: 150 });
        cy.wait(900)

        cy.contains('button', 'Asistan Ayarlarını Kaydet').click();
        cy.wait(2000)

        cy.get('.swal2-confirm').click();
        cy.wait(1500)


        //asistan erkek
        cy.get('div#app button:nth-child(2) > div > img').click();
        cy.wait(900)

        //asistan erkek sesi
        cy.get('.py-1:nth-child(1)').click();
        cy.wait(900)

        //asistan adı
        cy.get('input[placeholder="İsim Soyisim"]').click().clear().type("asistan erkek", { delay: 150 });
        cy.wait(900)

        cy.contains('button', 'Asistan Ayarlarını Kaydet').click();
        cy.wait(2000)

        cy.get('.swal2-confirm').click();
        cy.wait(1500)

        //asistan kadın
        cy.get("img[alt='Kadın']").click();
        cy.wait(900)

        //asistan kadın sesi
        cy.get('div#app div.bg-white.rounded-2xl.shadow-sm.border.border-gray-100.overflow-hidden > div:nth-child(2) > div > button').click();
        cy.wait(900)

        //asistan adı
        cy.get('input[placeholder="İsim Soyisim"]').click().clear().type("asistan kadın", { delay: 150 });
        cy.wait(900)

        cy.contains('button', 'Asistan Ayarlarını Kaydet').click();
        cy.wait(2000)

        cy.get('.swal2-confirm').click();
        cy.wait(1500)


    });
});

