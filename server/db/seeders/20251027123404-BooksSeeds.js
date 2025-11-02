'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('Books', [
  {
    title: "1984",
    desc: "Антиутопический роман Джорджа Оруэлла о тоталитарном обществе под постоянным наблюдением.",
    picture: "https://s1-goods.ozstatic.by/1000/21/594/10/10594021_0.jpg",
    pages: 328,
    hasBeenRead: false,
    userId: 1,
    author: "Джордж Оруэлл"
  },
  {
    title: "Убить пересмешника",
    desc: "История о расовой несправедливости и морали в маленьком городке Америки.",
    picture:"https://basket-12.wbbasket.ru/vol1843/part184378/184378676/images/big/1.webp",
    pages: 336,
    hasBeenRead: false,
    userId: 2,
    author: "Харпер Ли"
  },
  {
    title: "Гордость и предубеждение",
    desc: "Роман Джейн Остин о любви, классовых различиях и общественных ожиданиях.",
    picture: "https://s2-goods.ozstatic.by/2000/23/12/1/1012023_0.jpg",
    pages: 432,
    hasBeenRead: false,
    userId: 4,
    author: "Джейн Остин"
  },
  {
    title: "Мастер и Маргарита",
    desc: "Философский роман Михаила Булгакова, сочетающий сатиру, мистику и любовную драму.",
    picture: "https://basket-01.wbbasket.ru/vol22/part2282/2282346/images/big/1.webp",
    pages: 480,
    hasBeenRead: false,
    userId: 2,
    author: "Михаил Булгаков"
  },
  {
    title: "Преступление и наказание",
    desc: "Психологический роман Фёдора Достоевского о морали, вине и искуплении.",
    picture: "https://abrakadabra.fun/uploads/posts/2022-02/1645979814_1-abrakadabra-fun-p-prestuplenie-i-nakazanie-oblozhka-knigi-1.jpg",
    pages: 592,
    hasBeenRead: false,
    userId: 1,
    author: "Фёдор Достоевский"
  },
  {
    title: "Гарри Поттер и философский камень",
    desc: "Первая книга о юном волшебнике и его приключениях в Хогвартсе.",
    picture: "https://garrypotter.net/sites/default/files/styles/1980x1080/public/products/2022-10/2071/12-kniga-garri-potter-i-filosofskiy-kamen-rosmen_154debd39156bf3_1024x3000_1.jpg.webp",
    pages: 332,
    hasBeenRead: false,
    userId: 1,
    author: "Дж. К. Роулинг"
  },
  {
    title: "Атлант расправил плечи",
    desc: "Философский роман Айн Рэнд о капитализме, индивидуализме и борьбе за свободу.",
    picture: "https://www.moscowbooks.ru/image/book/592/orig/i592294.jpg?cu=20200622124514",
    pages: 1168,
    hasBeenRead: false,
    userId: 2,
    author: "Айн Рэнд"
  },
  {
    title: "Маленький принц",
    desc: "Философская сказка Антуана де Сент-Экзюпери о дружбе, любви и смысле жизни.",
    picture: "https://s1-goods.ozstatic.by/1000/10/801/10/10801010_0.jpg",
    pages: 96,
    hasBeenRead: false,
    userId: 3,
    author: "Антуан де Сент-Экзюпери"
  },
  {
    title: "Три товарища",
    desc: "Роман Эриха Марии Ремарка о дружбе, любви и выживании в трудные времена.",
    picture: "https://content.img-gorod.ru/pim/products/images/10/1d/0190e2dd-e926-7325-adda-3ffaf15e101d.jpg",
    pages: 416,
    hasBeenRead: false,
    userId: 4,
    author: "Эрих Мария Ремарк"
  },
  {
    title: "451 градус по Фаренгейту",
    desc: "Антиутопия Рэя Брэдбери о мире, где книги запрещены и сжигаются.",
    picture: "https://babelbooksberlin.com/cdn/shop/products/993da7c8785d1124fade805f3d3f04a0.webp?v=1708949907&width=480",
    pages: 256,
    hasBeenRead: false,
    userId: 3,
    author: "Рэй Брэдбери"
  },
  {
    title: "Алхимик",
    desc: "Притча Пауло Коэльо о поиске своей мечты и личной легенды.",
    picture: "https://catalog-cdn.detmir.st/media/5An8MusR82epmUy6uo3_Z--4YkZ3d6tnnE3L2ssnM_g=.webp?preset=site_product_gallery_r450",
    pages: 208,
    hasBeenRead: false,
    userId: 2,
    author: "Пауло Коэльо"
  },
  {
    title: "Сто лет одиночества",
    desc: "Магический реализм Габриэля Гарсиа Маркеса о судьбе рода Буэндиа.",
    picture: "https://ir.ozone.ru/s3/multimedia-0/6010168056.jpg",
    pages: 416,
    hasBeenRead: false,
    userId: 1,
    author: "Габриэль Гарсиа Маркес"
  }
],
 {}
);
  },
  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Books', null, {});
  }
};
