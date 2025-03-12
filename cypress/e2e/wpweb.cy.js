
const filePath = 'cypress/fixtures/matematikSonuclar.docx';
import 'cypress-file-upload';


describe('sfsdf', () => {
    it('sdfsdfsdf', () => {
        cy.visit('https://web.whatsapp.com/');
        cy.wait(15000); //  okutmak için bekleme süresi

        cy.get('._2_1wd') // Arama kutusunu bul
  .click()
  .type('Özge Yalçın'); // Kişinin veya grubun adını yaz

cy.contains('Özge Yalçın') // Sonuçlardan seç
  .click();


cy.get('span[data-icon="attach-menu-plus"]') // Ataç butonuna bas
  .click();

cy.get('input[type="file"]') // Dosya yükleme butonu
  .attachFile(filePath), { subjectType: 'drag-n-drop' };

cy.get('span[data-icon="send"]') // Gönder butonu
  .click();
    });
});