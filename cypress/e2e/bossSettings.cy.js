import { faker } from '@faker-js/faker';
import 'cypress-file-upload';



const randomName = faker.person.fullName();
const randomPhone = `+90${faker.number.int({ min: 5000000000, max: 5999999999 })}`;
const email = Cypress.env('EMAIL');
const password = Cypress.env('PASSWORD');
const dosyaYolu = "BOSS_Matematik_Soru_Havuzu.docx";

describe("Boss Giriş Testi", () => {

  
    beforeEach(() => {
        cy.viewport(1920, 1080);
    });
    it("Boss başarılı giriş yapar", () => {
      

        cy.visit("https://portal.bossai.app/");
        cy.wait(500)

        //email
        cy.get('input[placeholder="E-posta adresinizi girin"]').click().type(email, { delay: 100 });
        cy.wait(500)

        //sifre
        cy.get('input[placeholder="Şifrenizi girin"]').click().type(password, { delay: 100 });
        cy.wait(500)

        //giris
        cy.get('div#app button[type="submit"]').click();
        cy.wait(5000)

        // //ayarlar
        cy.get('div#app div:nth-child(7) > div > div > div > img').click();
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

        //ayarları kaydet
        cy.contains('button', 'Değişiklikleri Kaydet').click();
        cy.wait(2000)

        cy.get('.swal2-confirm').click();
        cy.wait(900)

        //mail ve ismi kontrol et
        cy.get('div#app p.text-sm.font-medium.text-gray-700').should('have.text', randomName);

        //ayarlar
        cy.get('div#app div:nth-child(7) > div > div > div > img').click();
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


        // dosya yükleme alanı
        cy.get("div#app div:nth-child(5) > div > div > div > img").click();
        cy.wait(4000)

        // //silme butonu
         cy.get("tbody tr:nth-child(4) td:nth-child(7) div:nth-child(1) button:nth-child(1) img:nth-child(1)").click();
         cy.wait(800)

        //silme onay ekranı
        cy.get(`div.swal2-actions > button[type="button"].swal2-confirm.swal2-styled.swal2-default-outline`).click()
        cy.wait(1500)

        cy.contains('button', 'OK').click();
        cy.wait(800)


        //dosya yükleme
        cy.get('div#app main > div > div:nth-child(2) > div > div').attachFile(dosyaYolu, { subjectType: 'drag-n-drop' });
        cy.wait(4000)

        cy.intercept('POST', '/files/0.0.1').as('fileUpload');
        cy.get('div#app div:nth-child(2) > button').click();
        cy.wait('@fileUpload').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);  // Yükleme başarılı mı?
        });

        cy.wait(2000)

        cy.reload();
        cy.wait(2000)


        cy.get('div#app td:nth-child(3) > div').should('contain', "BOSS_Matematik_Soru_Havuzu.docx");


        document.querySelector("tbody tr:nth-child(3) td:nth-child(7) div:nth-child(1) button:nth-child(1) img:nth-child(1)")
        document.querySelector("tbody tr:nth-child(2) td:nth-child(7) div:nth-child(1) button:nth-child(1) img:nth-child(1)") 
    });
});

