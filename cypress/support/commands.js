// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });

  Cypress.Commands.add("saveResultsAsDocx", (results) => {
    const doc = new Document({
        sections: [
            {
                properties: {},
                children: results.map((result) => 
                    new Paragraph([
                        new TextRun(`Soru: ${result.question}\n`).bold(),
                        new TextRun(`Cevap: ${result.answer}\n`),
                        new TextRun(`Durum: ${result.isCorrect}\n\n`),
                    ])
                ),
            },
        ],
    });

    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync("cypress/fixtures/matematikSonuclar.docx", buffer);
    });
});
});
