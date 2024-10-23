export const initShopItems = () => {
  if (localStorage.getItem(shopItems) != null) {
    return;
  }
  localStorage.setItem("shopItems", JSON.stringify(shopItems));
};

export const getShopItemsData = () => {
  // const shopItemsJSON = localStorage.getItem("shopItems");
  // const parsedData = JSON.parse(shopItemsJSON);
  // return parsedData;
};

export const shopItems = [
  {
    imgSrc: "/images/unsplash_oranges.jpg",
    name: "Oranges",
    price: 19.99,
    tags: ["Juicy", "Sweet", "Perfect for Summer!"],
    stock: true,
    discount: 10,
    description:
      " Oranges are bursting with refreshing citrus flavor and are packed with immune-boosting vitamin C. Their juicy sweetness makes them a delightful snack, perfect for any time of day.",
  },
  {
    imgSrc: "/images/unsplash_apple.jpg",
    name: "Apples",
    price: 19.99,
    tags: ["Fresh, crispy, golden apples", "Refreshing snack"],
    stock: false,
    discount: 0,
    description:
      "Crisp and juicy, apples are a timeless favorite among fruits. With their versatility in both sweet and savory dishes, along with their abundance of fiber and antioxidants, apples are not only delicious but also contribute to overall health and well-being.",
  },
  {
    imgSrc: "/images/unsplash_broccoli.jpg",
    name: "Broccoli",
    price: 15.99,
    tags: [
      "Fresh from local Australian farms",
      "Great addition for stir-fry!",
      "100% parabens free or something",
    ],
    stock: true,
    discount: 20,
    description:
      "Broccoli is a nutritional powerhouse, known for its high content of vitamins, minerals, and antioxidants. Its crunchy texture and earthy flavor make it a versatile addition to salads, stir-fries, and soups, providing a boost of essential nutrients with every bite.",
  },
  {
    imgSrc: "/images/unsplash_carrot.jpg",
    name: "Carrots",
    price: 12.99,
    tags: ["Vegan", "No added preservatives"],
    stock: false,
    discount: 15,
    description:
      "Vibrant and crunchy, carrots are not only delicious but also incredibly nutritious. Packed with beta-carotene, fiber, and vitamins, carrots promote eye health, aid in digestion, and add a sweet, earthy flavor to a variety of dishes.",
  },
  {
    imgSrc: "/images/unsplash_cucumber.jpg",
    name: "Cucumbers",
    price: 14.99,
    tags: [
      "Fresh from local Australian farms",
      "Good for salads!",
      "Refreshing",
    ],
    stock: true,
    discount: 30,
    description:
      "Cool and refreshing, cucumbers are a hydrating addition to salads, sandwiches, and dips. With their high water content and crisp texture, cucumbers provide a refreshing crunch while also offering a range of vitamins and minerals for overall health.",
  },
  {
    imgSrc: "/images/unsplash_lettuce.jpg",
    name: "Lettuce",
    price: 11.99,
    tags: [
      "Great addition for stir-fry!",
      "Green addition to salads",
      "Fresh from local Australian farms",
    ],
    stock: true,
    discount: 0,
    description:
      "Lettuce is a staple in salads, wraps, and sandwiches, known for its crisp texture and mild flavor. Rich in vitamins and minerals, lettuce is not only refreshing but also contributes to hydration and overall well-being.",
  },
  {
    imgSrc: "/images/unsplash_capsicums.jpg",
    name: "Capsicums",
    price: 19.99,
    tags: [
      "Perfect for stir-fry!",
      "Firm, crispy texture",
      "Rich, vibrant colours",
    ],
    stock: true,
    discount: 20,
    description:
      "Capsicum, with its vibrant colors and sweet flavor, adds a delightful crunch to dishes. Packed with vitamin C and antioxidants, bell peppers promote healthy skin, boost immunity, and enhance the flavor profile of any recipe.",
  },
  {
    imgSrc: "/images/unsplash_grapes.jpg",
    name: "Grapes",
    price: 17.99,
    tags: [
      "Juicy snack",
      "Fresh from local Australian farms",
      "Great for fruit salads!",
    ],
    stock: true,
    discount: 0,
    description:
      "Grapes are nature's bite-sized gems, bursting with sweetness and juiciness. Whether enjoyed fresh as a snack or incorporated into salads, desserts, or even savory dishes, grapes offer a delectable burst of flavor along with a dose of vitamins and antioxidants.",
  },
  {
    imgSrc: "/images/unsplash_potato.jpg",
    name: "Potatoes",
    price: 13.99,
    tags: [
      "Staple food",
      "Creamy and delicate when cooked",
      "Great side dish for dinner!",
    ],
    stock: true,
    discount: 0,
    description:
      "Potatoes are a versatile and comforting vegetable, loved for their rich texture and mild flavor. Whether roasted, mashed, baked, or fried, potatoes are a satisfying addition to any meal and provide essential nutrients like potassium, vitamin C, and fiber.",
  },
  {
    imgSrc: "/images/unsplash_strawberry.jpg",
    name: "Strawberries",
    price: 19.99,
    tags: ["Succulent fruit", "Ripe from the vine"],
    stock: true,
    discount: 30,
    description:
      "Strawberries are synonymous with summertime, offering a burst of sweetness and vibrant color. Packed with vitamin C, antioxidants, and fiber, strawberries are not only delicious but also promote heart health, skin health, and overall well-being.",
  },
  {
    imgSrc: "/images/unsplash_watermelon.jpg",
    name: "Watermelon",
    price: 15.99,
    tags: [
      "Summer go-to",
      "Great addition to fruit salads",
      "Delicious fruit to share",
    ],
    stock: true,
    discount: 50,
    description:
      "Refreshing and hydrating, watermelon is the epitome of summer fruit. With its juicy sweetness and high water content, watermelon is a guilt-free indulgence that also provides essential vitamins, minerals, and antioxidants for optimal health.",
  },
  {
    imgSrc: "/images/unsplash_peaches.jpg",
    name: "Peaches",
    price: 12.99,
    tags: [
      "Bursting with sweet flavour",
      "Versatile and perfect for snacking and beverages",
      "Rich in vitamins and antioxidants",
    ],
    stock: false,
    discount: 0,
    description:
      "Peaches, with their velvety skin and sweet juiciness, epitomize summer's essence. Whether enjoyed fresh, grilled, or baked, they offer a delightful blend of tangy and sugary flavors, evoking warmth and nostalgia in every bite. Their vibrant hue and intoxicating aroma make them a staple of seasonal dishes, reminding us to relish life's simple pleasures.",
  },
];

export const growableItems = [
  {
    name: "Cherry tomatoes",
    description:
      "Cherry tomatoes are a lucrative choice for farming due to their high yield potential and relatively short growing season. They thrive in various climates and can be grown in containers or in the ground, making them versatile for small and large-scale farming operations alike. Their compact size allows for higher plant density, maximizing space efficiency in fields or greenhouses. Additionally, cherry tomatoes are in high demand in both fresh and processed markets, ensuring a steady demand and favorable market prices for farmers.",
    feeding: "Weekly",
    humidity: "60-85%",
    spacing: "45cm",
    months: "December, January, February",
  },
  {
    name: "Baby spinach",
    description:
      "Baby spinach is a popular leafy green that offers several advantages for farming. It has a quick growth cycle, typically ready for harvest within 4-6 weeks, allowing for multiple crops per season. Spinach is also a nutrient-dense crop, rich in vitamins and minerals, appealing to health-conscious consumers. Its versatility in culinary applications, from salads to smoothies, ensures a consistent market demand. Moreover, spinach is relatively low-maintenance and adaptable to different soil types, making it a reliable choice for farmers seeking consistent yields.",
    feeding: "Daily",
    humidity: "83%",
    spacing: "6.25cm",
    months: "March, April, May",
  },
  {
    name: "Peas",
    description:
      "Peas are a profitable choice for farming due to their high nutritional value and widespread culinary use. They are nitrogen-fixing legumes, which improve soil fertility and reduce the need for synthetic fertilizers, promoting sustainable farming practices. Peas have a relatively short growing season and are adaptable to various climates, allowing for multiple harvests per year in some regions. With a strong demand for fresh and processed peas in both domestic and international markets, farmers can capitalize on steady market prices and high consumer demand.",
    feeding: "Weekly",
    humidity: "94%",
    spacing: "10cm",
    months: "August, September, October, November, December",
  },
  {
    name: "Cucumbers",
    description:
      "Cucumbers are a popular and versatile vegetable with several attributes that make them well-suited for farming. They have a high yield potential per plant and a relatively short growing season, allowing for multiple harvests in a single year. Cucumbers are also known for their adaptability to different growing conditions, thriving in both open fields and protected environments like greenhouses. With a wide range of culinary uses, from salads to pickles, cucumbers maintain a consistent market demand year-round, providing farmers with a reliable source of income.",
    feeding: "Weekly",
    humidity: "65%",
    spacing: "60cm",
    months: "November, December",
  },
  {
    name: "Green beans",
    description:
      "Green beans are an attractive choice for farming due to their high productivity and nutritional value. They are fast-growing and can be harvested within a few weeks of planting, allowing for multiple crops per season. Green beans are also well-suited for mechanized harvesting, reducing labor costs for farmers. With a strong demand for fresh and processed green beans in both domestic and international markets, farmers can benefit from stable market prices and consistent consumer demand throughout the year.",
    feeding: "Weekly",
    humidity: "45%",
    spacing: "5cm",
    months: "September, October, November, December, Janurary",
  },
  {
    name: "Chillies",
    description:
      "Chillies are a profitable crop for farming due to their high market value and relatively low production costs. They have a long shelf life and can be dried or processed into various products like powders, sauces, and pastes, extending their marketability beyond fresh consumption. Chillies are resilient plants that thrive in diverse climates, making them suitable for cultivation in a wide range of regions. With the growing popularity of spicy cuisine globally, the demand for chillies remains strong, offering farmers a lucrative opportunity for cultivation and sales.",
    feeding: "Every second day",
    humidity: "75%",
    spacing: "50cm",
    months: "October, November",
  },
];
