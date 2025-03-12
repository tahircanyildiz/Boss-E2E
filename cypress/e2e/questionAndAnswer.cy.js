const fs = require('fs');
const { Document, Packer, Paragraph } = require('docx');

const email = Cypress.env('EMAIL');
const password = Cypress.env('PASSWORD');
const filePath = 'cypress/fixtures/sonuclar.txt';
const botToken = '7519351932:AAEUxs8n0s1_kccVoutI8yCyUFBexfRM79M';  // Bot token'ınızı buraya ekleyin
const chatId = '1089457879';  // Chat ID'nizi buraya ekleyin

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
                question: "Haziran ayında doğan çalışanlarım kimlerdir?",
                expectedNames: ["Murat Korkmaz", "Volkan Er", "Tuğçe Ateş", "Melis Erdoğan"],
                counter: 3
            },
            // {
            //     question: "Evli Olan Çalışan Sayısı Kaçtır",
            //     expectedNames: ["25"],
            //     counter: 5
            // },
            // {
            //     question: "İlk tecrübesi otomotiv olan kişilerin isimleri nelerdir?",
            //     expectedNames: ["Ahmet Yılmaz", "Zeynep Yıldız", "Emre Polat", "Melis Erdoğan", "Rıza Bulut", "Rıdvan Soylu"],
            //     counter: 7
            // },
            // {
            //     question: "Doğum yeri en fazla olan ülke hangisidir ve sayısı kaçtır?",
            //     expectedNames: ["Türkiye", "40"],
            //     counter: 9
            // },
            // {
            //     question: "İK Bölümünde çalışan, ünvanı uzman olan ön lisans mezunu kişi sayısı kaçtır?",
            //     expectedNames: [10],
            //     counter: 11
            // },
            // {
            //     question: "İlk tecrübesi otomotiv olan kişi sayısı kaçtır?",
            //     expectedNames: [6],
            //     counter: 13
            // },
            // {
            //     question: "İlk tecrübesi otomotiv olanların kaçı erkektir?",
            //     expectedNames: [4],
            //     counter: 15
            // },
            // {
            //     question: "Doğum yeri Ankara olan çalışan sayısının toplam çalışan sayısına oranı nedir?",
            //     expectedNames: ["%4"],
            //     counter: 17
            // },
            // {
            //     question: "Toplam çalışma yılı 10 yıl ve üzeri olan kişi sayısı kaçtır?",
            //     expectedNames: ["39"],
            //     counter: 19
            // },
            // {
            //     question: "Stok tutarı en fazla olan malzeme hangisidir?",
            //     expectedNames: ["Epoksi Reçine"],
            //     counter: 21
            // },
            // {
            //     question: "Gram cinsinden stoklanan malzeme sayısı kaçtır?",
            //     expectedNames: [2],
            //     counter: 23
            // },
            // {
            //     question: "Stok maliyeti en fazla olan 3 malzeme nedir?",
            //     expectedNames: ["Epoksi Reçine", "Fiber Optik Kablo", "Silikon Yağ"],
            //     counter: 25
            // },
            // {
            //   question: "En fazla hangi stok biriminden malzeme vardır?",
            //     expectedNames: ["Metal"],
            //     counter: 27
            //     //hatalı
            // },
            // {
            //     question: "Stok birimi adet olup miktarı 1000 ve üzeri olan malzemelerin toplam stok tutarı nedir?",
            //     expectedNames: ["124.900"],
            //     counter: 29
            // },
            // {
            //     question: "Toplam stok tutarı ne kadardır?",
            //     expectedNames: ["1.984.300"],
            //     counter: 31
            // },
            // {
            //     question: "Epoksi Reçine malzemesinin stok tutarı içindeki payı nedir?",
            //     expectedNames: ["%37,8"],
            //     counter: 33
            // },
            // {
            //     question: "Termin süresi en uzun olup, stok miktarı en düşük olan malzeme hangisidir?",
            //     expectedNames: ["Kırılmaz Cam"],
            //     counter: 35
            // },
            // {
            //     question: "Raf ömürlü malzemelerin toplam stok tutar ne kadardır?",
            //     expectedNames: ["1.984.300"],
            //     counter: 37
            // },
            // {
            //     question: "Birim fiyatı en yüksek olan 3 malzeme hangisidir?",
            //     expectedNames: ["Kompozit Levha", "Aluminyum Kasa", "Paslanmaz Çelik"],
            //     counter: 39
            // },
            // {
            //     question: "Oğuz Aksoy'un satış sorumlusu olduğu ve cirosu en yüksek firma hangisidir?",
            //     expectedNames: ["Kaya Elektrik"],
            //     counter: 41
            // },
            // {
            //     question: "Hakan Şimşek'in sorumlu olduğu müşterilerin cirosunun toplam ciroya oranı kaçtır?",
            //     expectedNames: ["%31,08"],
            //     counter: 43
            // },
            // {
            //     question: "En yüksek ciroya sahip müşteri ile en düşük ciroya sahip müşteri arasındaki fark nedir?",
            //     expectedNames: ["2.900.000"],
            //     counter: 45
            // },
            // {
            //     question: "Lokasyonu Adana'da olan müşterinin adı nedir?",
            //     expectedNames: ["Aslan Elektrik"],
            //     counter: 47
            // },
            // {
            //     question: "En son imzaladığım sözleşme hangi müşteriye aittir?",
            //     expectedNames: ["BaşarıTek Motorlar"],
            //     counter: 49
            // },
            // {
            //     question: "Kaç tane müşterinin vadesi 10'dur?",
            //     expectedNames: [19],
            //     counter: 51
            // },
            // {
            //     question: "Vadesi 20 olan müşterilerimin toplam ciro tutarı ne kadardır?",
            //     expectedNames: ["26.800.000"],
            //     counter: 53
            // },
            // {
            //     question: "Vadesi 30 olan en eski sözleşme tarihine sahip müşterimin satış sorumlusunun cinsiyeti nedir?",
            //     expectedNames: ["Erkek"],
            //     counter: 55
            //     //hatalı
            // },
            // {
            //     question: "Bünyamin Elektrik Motorları firmasının en son teslim edilen ürününün sipariş miktarı ve sevkiyat tarihi nedir?",
            //     expectedNames: ["10, 08.12.2024"],
            //     counter: 57
            //     //hatalı
            // },
            // {
            //     question: "Hangi ürünün sipariş miktarı en fazladır ve toplam sipariş miktarı kaç adettir?",
            //     expectedNames: ["Ü2, 293"],
            //     counter: 59
            //     //hatalı
            // },
            // {
            //     question: "Kaç tane sipariş istenen teslim tarihine göre geç teslim edilmiştir",
            //     expectedNames: [87],
            //     counter: 61
            //     //hatalı
            // },
            // {
            //     question: "Hangi müşterinin siparişleri daha fazla geç teslim edilmiştir. Adı nedir",
            //     expectedNames: ["Ege Motor", 5],
            //     counter: 63
            //     //hatalı
            // },
            // {
            //     question: "Sipariş adedine göre en fazla sipariş edilen ürünün adı nedir",
            //     expectedNames: ["Elektrikli Motor"],
            //     counter: 65
            //     //hatalı
            // },
            // {
            //     question: "Sipariş adedine göre en fazla alınan siparişten kaç tane sipariş alınmıştır ve sipariş idleri nelerdir",
            //     expectedNames: ["S9", "S20", "S30", "S39", "S49", "S59", "S68", "S78", "S88", "S98","10"],
            //     counter: 67
            //     //hatalı
            // },
            // {
            //     question: "En fazla hangi şehirlere teslimat yapılmıştır ve teslim edilen sipariş sayısı kaçtır",
            //     expectedNames: ["Kayseri, Sakarya, İzmir, 7,7,7"],
            //     counter: 69
            //     //hatalı
            
            // },
            // {
            //     question: "En fazla ciroya sahip olan müşterimin siparişleri hangi şehiredir",
            //     expectedNames: ["Ankara"],
            //     counter: 71
            //     //hatalı
            // },
            // {
            //     question: "Nova Motor Üretim ödemesi gereken tutara göre gecikmiş ödemesi var mıdır",
            //     expectedNames: ["Evet"],
            //     counter: 73
            //     //hatalı
            // },
            // {
            //     question: "Nova Motor Üretim müşterimin ödemediği fatura tutarı ne kadardır",
            //     expectedNames: [436.953],
            //     counter: 75
            // },
            // {
            //     question: "Hiç ödenmemiş kaç ödemem vardır",
            //     expectedNames: [20],
            //     counter: 77
            // },
            // {
            //     question: "Tarihe göre gecikmiş ödemem ne kadardır ve bunların sayısının toplam ödemelere oranı nedir",
            //     expectedNames: [],
            //     counter: 79
            //     //hatalı
            // },
            // {
            //     question: "Ocak 2025'de ödenecek faturaların toplam tutarı nedir",
            //     expectedNames: [80.557],
            //     counter: 81
            // },
            // {
            //     question: "Ödeme tarihi ile ödenmesi gereken tarih aynı olan müşterilerimi bana sıralar mısın",
            //     expectedNames: ["Ege Motor Çözümleri","Özgün Motor Teknik","Bünyamin Elektrik Motorları","Aslan Elektrik Motor","Mert Elektrik Motor","Küresel Motor Teknolojileri","Yüksek Vizyon Motor","Atlas Motor Proje","Güneş Motor Sistemleri","Bilge Motor Sistemleri","Görkem Elektrik Motor","BaşarıTek Motorlar","Yıldız Motor Teknolojileri","Nova Motor Üretim","Özel Motor Teknik","Hızlı Motor Çözümleri"],
            //     counter: 83
            // },
            // {
            //     question: "Tüm borçlarının tamamını ödeyen müşterilerimin idlerini söyler misin",
            //     expectedNames: ["M24", "M2", "M14", "M5", "M13", "M30"],
            //     counter: 85
            // },
            // {
            //     question: "Bana en fazla borcu olan müşterim hangisidir",
            //     expectedNames: ["Yıldız Motor Teknolojileri"],
            //     counter: 87
            // },
            // {
            //     question: "Lokasyonu İzmir olan tedarikçilerimin isimleri nelerdir",
            //     expectedNames: ["DynoPart", "VoltMaster"],
            //     counter: 89
            // },
            // {
            //     question: "Vadesi en düşük olan tedarikçilerimin sayısı kaçtır",
            //     expectedNames: [5],
            //     counter: 91
            // },
            // {
            //     question: "2024 Ocak ayında, bankalara yapmam gerek toplam ödeme ne kadardır",
            //     expectedNames: [425.850],
            //     counter: 93
            // },
            // {
            //     question: "Globalbanka toplam ne kadar para ödedim",
            //     expectedNames: [787.500],
            //     counter: 95
            // },
            // {
            //     question: "Globalbank'a hangi ay eksik ödeme yaptım",
            //     expectedNames: ["Haziran"],
            //     counter: 97
            //     //hatalı
            // },
            // {
            //     question: "Globalbank ve MetroCaptial'e ne kadar toplam borcum kaldı",
            //     expectedNames: ["1.153.090"],
            //     counter: 99
            //     //hatalı
            // },
            // {
            //     question: "Bu ay toplam ödemem gereken tutar ne kadar",
            //     expectedNames: [425.850 + 244.662],
            //     counter: 101
            //     //hatalı
            // },
            // {
            //     question: "Zamanında ve fazla ödediğim tedarikçi ödeme sayım kaçtır",
            //     expectedNames: [14],
            //     counter: 103
            //     //hatalı
            // },
            // {
            //     question: "Zamanında ve eksik ödediğim tedarikçi ödeme sayım kaçtır",
            //     expectedNames: [5],
            //     counter: 105
            //     //hatalı
            // },
            // {
            //     question: "Gecikmiş ve tam ödediğim tedarikçi ödeme sayım kaçtır",
            //     expectedNames: [0],
            //     counter: 107
            //     //hatalı
            // },
            // {
            //     question: "Gecikmiş ve eksik ödediğim tedarikçi ödeme sayım kaçtır",
            //     expectedNames: [6],
            //     counter: 109
            //     //hatalı
            // },
            // {
            //     question: "Gecikmiş ve fazla ödediğim tedarikçi ödeme sayım kaçtır",
            //     expectedNames: [17],
            //     counter: 111
            //     //hatalı
            // },
            // {
            //     question: "Olması gereken tutardan en fazla ödediğim tedarikçimin adı nedir ve tutarı ne kadardır",
            //     expectedNames: ["Vektor Elektrik", 418],
            //     counter: 113
            //     //hatalı
            // },
            // {
            //     question: "Olması gereken tutardan en az ödediğim tedarikçimin adı nedir ve tutarı ne kadardır",
            //     expectedNames: ["VoltMaster", 548],
            //     counter: 115
            //     //hatalı
            // },
            // {
            //     question: "En fazla ödeme yaptığım tedarikçimin adı nedir",
            //     expectedNames: ["EkoMotor Teknoloji"],
            //     counter: 117
            //     //hatalı
            // },
            // {
            //     question: "İzmir lokasyonundaki tedarikçilerime ne kadar ödeme yaptım",
            //     expectedNames: [201802],
            //     counter: 119
            //     //hatalı
            // },
            // {
            //     question: "İzmir lokasyonundaki tedarikçilerime ne kadar ödeme yapacağım",
            //     expectedNames: [949670],
            //     counter: 121
            //     //hatalı
            // },
           
        ];
        

        const results = []; // Sonuçlar

        cy.intercept("POST", "/ai/0.0.1/ask/").as("askRequest");
        cy.intercept("GET", "/ai/0.0.1/status").as("statusRequest");

        questions.forEach(({ question, expectedNames, counter }) => {
            cy.get("input[placeholder='Sorunuzu yazın...']").type(question)
            cy.get("button[aria-label='Mesaj gönder'] svg").click()

            cy.wait("@askRequest").its("response.statusCode").should("eq", 200);
            cy.wait("@statusRequest", { timeout: 10000 }).its("response.statusCode").should("eq", 200);

            cy.get(`body > div:nth-child(1) > div:nth-child(1) > main:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(${counter}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)`)
                .invoke('text')
                .then((text) => {
                    cy.log(text)
                    let isCorrect = expectedNames.every((name) => text.includes(name));

                    if (isCorrect) {
                        cy.log(`✅ Doğru cevap`);
                    } else {
                        cy.log(`❌ Yanlış cevap`);
                    }
                    results.push({
                        question,
                        answer:text,
                        isCorrect: isCorrect ? 'Doğru' : "Yanlış"
                    });
                })

                .then(() => {
                    if (questions.indexOf(questions[questions.length - 1]) === results.length - 1) {
                        const output = results.map(result => `Soru: ${result.question} \nCevap: ${result.answer} \nDurum: ${result.isCorrect}\n\n`).join('');

                        cy.writeFile('cypress/fixtures/sonuclar.txt', output);
                        cy.writeFile('cypress/fixtures/matematikSonuclar.docx', output);

                    }
                });
        });

        cy.task('sendTelegramFile', { botToken, chatId, filePath }).then(response => {
            expect(response.ok).to.be.true;
            cy.log('✅ Dosya başarıyla gönderildi:', response);
          });

       
    });
});
