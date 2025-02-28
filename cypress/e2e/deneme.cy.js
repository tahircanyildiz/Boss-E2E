describe("Google Ana Sayfa Testi", () => {
    it("Google sayfasını açar ve başlığı doğrular", () => {
      cy.visit("https://www.google.com");
      cy.title().should("include", "Google");
    });
  });