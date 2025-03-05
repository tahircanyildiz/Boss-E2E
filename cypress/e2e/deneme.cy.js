describe('OpenAI GPT-4 API Testi', () => {
  it('GPT-4 ile bir soru sor ve yanıtın doğruluğunu kontrol et', () => {
    const soru = "Beylikdüzü hangi ilin ilçesidir?";
    const beklenenYanıt = "İstanbul";

    cy.request({
      method: 'POST',
      url: 'https://api.openai.com/v1/chat/completions',  
      headers: {
        Authorization: `Bearer ${Cypress.env('OPENAI_API_KEY')}`, 
        'Content-Type': 'application/json',
      },
      body: {
        model: 'gpt-4',  
        messages: [{ role: "user", content: soru }],  
        max_tokens: 50,  
      },
    }).then((response) => {
      expect(response.status).to.eq(200); 

      const gptYaniti = response.body.choices[0].message.content.trim();

      expect(gptYaniti.toLowerCase()).to.include(beklenenYanıt.toLowerCase());

      cy.log('GPT Yanıtı:', gptYaniti);
    });
  });
});
