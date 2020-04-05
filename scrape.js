// const puppeteer = require('puppeteer');

// let scrape = async () => {
//     const browser = await puppeteer.launch({headless: false});
//     const page = await browser.newPage();

//     await page.goto('http://books.toscrape.com/');
//     await page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img');
//     await page.waitFor(1000);

//     const result = await page.evaluate(() => {
//         let title = document.querySelector('h1').innerText;
//         let price = document.querySelector('.price_color').innerText;

//         return {
//             title,
//             price
//         }

//     });

//     browser.close();
//     return result;
// };

// scrape().then((value) => {
//     console.log(value); // Получилось!
// });


const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.emulate(iPhone)
    await page.goto('http://books.toscrape.com/');

    const result = await page.evaluate(() => {
        let data = []; // Создаём пустой массив для хранения данных
        let elements = document.querySelectorAll('.product_pod'); // Выбираем все товары

        for (var element of elements){ // Проходимся в цикле по каждому товару
            let title = element.childNodes[5].innerText; // Выбираем название
            let price = element.childNodes[7].children[0].innerText; // Выбираем цену
            let link=element.childNodes[5].children[0].getAttribute('href')//находим ссылки
            data.push({title, price,link}); // Помещаем объект с данными в массив
        }

        return data.slice(0, 3); // Возвращаем массив первые 3
    });
    console.log('array'+result)
   
    browser.close();
    return result // Возвращаем данные
};

// scrape().then((value) => {
//     console.log(value); // Получилось!
// });


let scrape_next = async (sc_date) => {
    // авайт функции нужно пербирать в циклах for of они не работают с forEach, можно map если promiss all  использовать https://habr.com/ru/post/435084/
    let massiv=[]
    for (let element of sc_date){
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.emulate(iPhone)
        await page.goto(`http://books.toscrape.com/${element.link}`);
        await page.waitFor(1000);
        const result = await page.evaluate(() => {
                    let title = document.querySelector('h1').innerText;
                    let price = document.querySelector('.price_color').innerText;
            
                    return {
                        title,
                        price
                    }
            
                });
                browser.close();
                massiv.push(result)   
    }         
      return massiv 
};

scrape().then((value)=>scrape_next(value)).then((value) => {console.log(value)});
    
