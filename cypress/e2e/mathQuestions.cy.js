const email = Cypress.env('EMAIL');
const password = Cypress.env('PASSWORD');

describe('Boss Soru Cevap Testi', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
    });
    it('Boss sorulan sorulara beklenen cevapları verir', () => {

        cy.visit("https://portal.bossai.app/");
        cy.wait(2000)

        //email
        cy.get('input[placeholder="E-posta adresinizi girin"]').click().type(email, { delay: 100 });
        cy.wait(500)

        //sifre
        cy.get('input[placeholder="Şifrenizi girin"]').click().type(password, { delay: 100 });
        cy.wait(500)

        //giris
        cy.get('div#app button[type="submit"]').click();
        cy.wait(5000)

        //sohbeti temizle
        cy.contains('button', 'Sohbeti Temizle').click();
        cy.wait(500)
        cy.contains('div', 'Tüm sohbet geçmişi silinecek. Bu işlem geri alınamaz.')
            .find('button')
            .contains('Sohbeti Temizle')
            .click();
        cy.wait(1500)

        const questions = [
            {
                question: "Bir torbada 4 kırmızı, 3 mavi, 5 yeşil top vardır. Rastgele çekilen 2 topun aynı renkte olma olasılığı nedir?",
                expectedAnswer: ["19/66"],
                counter: 3
            },
            {
                question: "İki basamaklı bir sayının onlar basamağı birler basamağının 2 katıdır. Bu sayı, rakamlarının yerleri değiştirildiğinde 36 azalıyor. Sayıyı bulun.",
                expectedAnswer: ["84"],
                counter: 5
            },
            {
                question: "Ali, bir A şehrinden B şehrine arabasıyla gidiyor. Yolculuğun ilk yarısını saatte 60 km hızla, ikinci yarısını saatte 90 km hızla gidiyor. Yolculuk süresinin ortalama hızını hesaplayın.",
                expectedAnswer: ["72"],
                counter: 7
            },
            {
                question: "Bir kimyager, %30 şeker içeren 10 litre ve %50 şeker içeren 20 litre şekerli suyu karıştırıyor. Ortaya çıkan karışımın şeker oranı kaç olur?",
                expectedAnswer: ["43.33"],
                counter: 9
            },
            {
                question: "Bir çiftçi, üç farklı büyüklükte tarlaya sahiptir: İlk tarla toplam arazinin %40’ını, ikinci tarla %35’ini, üçüncü tarla geri kalanını kaplamaktadır. Çiftçi, bu tarlalara sırasıyla buğday, mısır ve arpa ekmektedir. Buğdayın verimi 600 kg/da, mısırın verimi 750 kg/da, arpanın verimi 500 kg/da olarak hesaplanmıştır. Eğer toplam arazi 500 dekar ise çiftçinin toplam verimi kaç tondur?",
                expectedAnswer: ["313.75"],
                counter: 11
            },
            {
                question: "Bir öğrenci, matematik sınavında 50 soru çözmüştür. Doğru cevapladığı her soru için 4 puan, yanlış cevapladığı her soru için -1 puan almaktadır. Öğrencinin toplam puanı 170 ise kaç soruyu doğru cevaplamıştır?",
                expectedAnswer: ["44"],
                counter: 13
            },
            {
                question: "Bir çiftçi tarlasını ekmek için 3 traktör kiralıyor. Traktörlerin çalışma hızları sırasıyla 5 dönüm/saat, 7 dönüm/saat ve 10 dönüm/saat. Çiftçi toplam 220 dönüm araziyi ne kadar sürede ekip bitirebilir?",
                expectedAnswer: ["10"],
                counter: 15
            },
            {
                question: "Bir su deposu, iki muslukla dolduruluyor. Birinci musluk tek başına depoyu 6 saatte, ikinci musluk ise 3 saatte dolduruyor. İkisi birlikte çalışırsa depo kaç saatte dolar?",
                expectedAnswer: ["2"],
                counter: 17
            },
            {
                question: "Bir çiftlikte 5 tavuk ve 3 inek vardır. Tavukların her birinin 2 bacağı, ineklerin her birinin 4 bacağı vardır. Çiftlikte toplam kaç bacak vardır?",
                expectedAnswer: ["22"],
                counter: 19
            },
            {
                question: "Bir zar iki kez atılıyor. İki atışın toplamının 7 olma olasılığı nedir?",
                expectedAnswer: ["1/6"],
                counter: 21
            },
            {
                question: "Kök 81 – kök 16 = ?",
                expectedAnswer: ["5"],
                counter: 23
            },
            {
                question: "2x+5=15 ise x kaçtır ?",
                expectedAnswer: ["5"],
                counter: 25
            },
            {
                question: "Bir torbada 4 kırmızı, 3 mavi, 5 yeşil top vardır. Rastgele çekilen 2 topun aynı renkte olma olasılığı nedir?",
                expectedAnswer: ["28.79"],
                counter: 27
            },
            {
                question: "İki işçi birlikte çalışarak bir işi 12 günde bitirebiliyor. İlk işçi tek başına bu işi x günde, ikinci işçi ise tek başına (x + 6) günde tamamlayabiliyor. Bu iki işçinin bireysel çalışma sürelerini bulun.",
                expectedAnswer: ["{12,18} , {6,12}"],
                counter: 29
            },
            {
                question: "Bir binada 7 kişi var ve bu kişiler 4 farklı asansöre rastgele binecek. Her kişinin herhangi bir asansöre binme olasılığı eşittir. En az bir asansör boş kalma olasılığı nedir?",
                expectedAnswer: ["85.4"],
                counter: 31
            },
            {
                question: "Aşağıdaki işlemin doğru olması için her harfi temsil eden rakamları bulun: SEND+MORE=MONEY",
                expectedAnswer: ["S=9", "E=5", "N=6", "D=7", "M=1", "O=0", "R=8", "Y=2"],
                counter: 33
            },
            {
                question: "Bir kutuda 6 kırmızı, 4 mavi ve 5 yeşil bilye var. İçinden 3 bilye çekiliyor. En az iki kırmızı bilye gelme olasılığı kaçtır?", expectedAnswer: ["31/91"],
                counter: 35
            },
            {
                question: "Bir kargo şirketi, A noktasından B noktasına paket taşıyor. Şirketin üç farklı rotası var: Rota 1: 200 km, ortalama hız 80 km/h, benzin tüketimi 6 L/100 km Rota 2: 180 km, ortalama hız 60 km/h, benzin tüketimi 5.5 L/100 km Rota 3: 220 km, ortalama hız 100 km/h, benzin tüketimi 7 L/100 km Benzin fiyatı 35 TL/L ve işçilik maliyeti 50 TL/saat ise, en ekonomik rota hangisidir?",
                expectedAnswer: ["496.5"],
                counter: 37
            },
            {
                question: "x ve y birer pozitif tam sayı olmak üzere: x ^3 + y^3 = 1729 olduğuna göre, x ve y'nin değerlerini bulun.",
                expectedAnswer: ["(1, 12)", "(12, 1)", "(9, 10)", "(10, 9)"],
                counter: 39
            },
            {
                question: "Bir çemberin içine çizilmiş ABC üçgeninde: AB = 10 cm, BC = 14 cm, CA = 16 cm. Çemberin merkezi üçgenin içinde. Üçgenin çevrel çemberinin yarıçapını bulun.",
                expectedAnswer: ["14/√3"],
                counter: 41
            },
            {
                question: "Bir karınca, bir ızgarada (0,0) noktasından başlayarak rastgele sağa veya yukarı hareket edebilmektedir. Karınca, (3,3) noktasına gitmek zorundadır. Karıncanın bu noktaya varma olasılığı kaçtır?",
                expectedAnswer: ["5/16"],
                counter: 43
            }
        ];



        const results = [];

        cy.intercept("POST", "/ai/0.0.1/ask/").as("askRequest");
        cy.intercept("GET", "/ai/0.0.1/status").as("statusRequest");

        questions.forEach(({ question, expectedAnswer, counter }) => {
            cy.get("input[placeholder='Sorunuzu yazın...']").type(question)
            cy.get("button[aria-label='Mesaj gönder'] svg").click()

            cy.wait("@askRequest").its("response.statusCode").should("eq", 200);
            cy.wait("@statusRequest", { timeout: 10000 }).its("response.statusCode").should("eq", 200);

            cy.get(`body > div:nth-child(1) > div:nth-child(1) > main:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(${counter}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)`)
                .should('exist') // Eğer eleman varsa devam et, yoksa yeni soruya geç
                .then(($el) => {
                    cy.wrap($el).invoke('text').then((text) => {
                        cy.log(text);
                        let isCorrect = expectedAnswer.every((name) => text.includes(name));

                        if (isCorrect) {
                            cy.log(`✅ Doğru cevap`);
                        } else {
                            cy.log(`❌ Yanlış cevap`);
                        }

                        results.push({
                            question,
                            isCorrect: isCorrect ? 'Doğru' : 'Yanlış'
                        });
                    }).then(() => {
                        if (questions.indexOf(questions[questions.length - 1]) === results.length - 1) {
                            const output = results.map(result => `Soru: ${result.question}\nDurum: ${result.isCorrect}\n\n`).join('');
                            cy.writeFile('cypress/fixtures/matematikSonuclar.txt', output);
                        }
                    });
                })
        });
    });
});
