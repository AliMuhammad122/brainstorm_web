/* Demo data used by /pages/screens routes */

export const IMG = {
  // restaurants
  r1: "https://picsum.photos/seed/fridays1/800/400",
  r2: "https://picsum.photos/seed/fridays2/800/400",
  r3: "https://picsum.photos/seed/nation3/800/400",
  r4: "https://picsum.photos/seed/medit4/800/400",
  r5: "https://picsum.photos/seed/spice55/800/400",
  r6: "https://picsum.photos/seed/green66/800/400",
  r7: "https://picsum.photos/seed/ocean77/800/400",
  r8: "https://picsum.photos/seed/sweet88/800/400",
  // hero
  h1: "https://picsum.photos/seed/hero111/800/500",
  h2: "https://picsum.photos/seed/hero222/800/500",
  // menu items
  mc1: "https://picsum.photos/seed/fried01/300/300",
  mc2: "https://picsum.photos/seed/wicked2/300/300",
  mc3: "https://picsum.photos/seed/finger3/300/300",
  ms1: "https://picsum.photos/seed/salmon1/300/300",
  ms2: "https://picsum.photos/seed/shrimp2/300/300",
  msw1: "https://picsum.photos/seed/burger1/300/300",
  msw2: "https://picsum.photos/seed/clubsw2/300/300",
  mp1: "https://picsum.photos/seed/pasta11/300/300",
  mp2: "https://picsum.photos/seed/alfre22/300/300",
  md1: "https://picsum.photos/seed/brown11/300/300",
  md2: "https://picsum.photos/seed/chees22/300/300",
  mb1: "https://picsum.photos/seed/wings11/300/300",
  mb2: "https://picsum.photos/seed/tender2/300/300",
  mb3: "https://picsum.photos/seed/smash33/300/300",
  mb4: "https://picsum.photos/seed/swiss44/300/300",
  // cats
  cp: "https://picsum.photos/seed/catpop1/300/300",
  cn: "https://picsum.photos/seed/catnby2/300/300",
  ch: "https://picsum.photos/seed/cathtd3/300/300",
  cs: "https://picsum.photos/seed/catspc4/300/300",
  cd: "https://picsum.photos/seed/catdst5/300/300",
  cv: "https://picsum.photos/seed/catveg6/300/300",
  csf: "https://picsum.photos/seed/catsea7/300/300",
  cbg: "https://picsum.photos/seed/catbgr8/300/300",
  cpz: "https://picsum.photos/seed/catpzz9/300/300",
  csu: "https://picsum.photos/seed/catsu10/300/300",
  // banners
  bn1: "https://picsum.photos/seed/bann001/400/400",
  bn2: "https://picsum.photos/seed/bann002/400/400",
  bn3: "https://picsum.photos/seed/bann003/400/400",
  // user
  usr: "https://picsum.photos/seed/user001/100/100",
};

export const MENU = {
  "TGI FRIDAY'S": {
    hero: IMG.h1,
    sections: [
      {
        category: "Chicken",
        items: [
          {
            id: 1,
            name: "COUNTRY FRIED CHICKEN",
            desc: "Two boneless chicken breasts, hand battered and deep fried to golden brown.",
            price: "€11.90",
            priceNum: 11.9,
            img: IMG.mc1,
            ingredients: [
              { name: "Cheese", price: "€1.50" },
              { name: "Salad", price: "€0.50" },
              { name: "Onion", price: "€0.70" },
              { name: "Garlic", price: "€2.50" },
            ],
            removeable: [
              { name: "No Onion" },
              { name: "No Tomato's" },
              { name: "No Black Paper" },
              { name: "No Chili" },
            ],
            drinks: [
              { name: "Coca Cola" },
              { name: "Sprite" },
              { name: "Zup" },
              { name: "Coke" },
            ],
          },
          {
            id: 2,
            name: "WICKED CHICKEN",
            desc: "Cajun-spiced chicken breasts topped with Cajun cream sauce served over Spanish rice.",
            price: "€24.50",
            priceNum: 24.5,
            img: IMG.mc2,
            ingredients: [
              { name: "Cajun Spice", price: "€1.00" },
              { name: "Cream Sauce", price: "€0.80" },
              { name: "Rice", price: "€0.50" },
            ],
            removeable: [{ name: "No Spice" }, { name: "No Sauce" }, { name: "No Rice" }],
            drinks: [
              { name: "Coca Cola" },
              { name: "Sprite" },
              { name: "Water" },
              { name: "Juice" },
            ],
          },
          {
            id: 3,
            name: "CHICKEN FINGER",
            desc: "Our crispy, golden brown chicken fingers are tender and juicy. Served with Honey Mustard and crispy fries.",
            price: "€18.20",
            priceNum: 18.2,
            img: IMG.mc3,
            ingredients: [
              { name: "Honey Mustard", price: "€0.50" },
              { name: "Extra Fries", price: "€1.50" },
            ],
            removeable: [{ name: "No Mustard" }, { name: "No Pepper" }],
            drinks: [
              { name: "Coca Cola" },
              { name: "Sprite" },
              { name: "Zup" },
              { name: "Coke" },
            ],
          },
        ],
      },
      {
        category: "Seafoods",
        items: [
          {
            id: 4,
            name: "SIGNATURE GLAZED SALMON",
            desc: "Skewered shrimp, Signature Glaze Blaze sauce, fire-grilled salmon fillet with choice of two sides.",
            price: "€111.90",
            priceNum: 111.9,
            img: IMG.ms1,
            ingredients: [
              { name: "Glaze Sauce", price: "€2.00" },
              { name: "Shrimp Extra", price: "€3.50" },
            ],
            removeable: [{ name: "No Sauce" }, { name: "No Shrimp" }],
            drinks: [{ name: "White Wine" }, { name: "Water" }, { name: "Sprite" }],
          },
          {
            id: 5,
            name: "CRISPY SHRIMP",
            desc: "Golden fried shrimp served with cocktail sauce and a side of coleslaw.",
            price: "€19.90",
            priceNum: 19.9,
            img: IMG.ms2,
            ingredients: [
              { name: "Cocktail Sauce", price: "€0.80" },
              { name: "Extra Coleslaw", price: "€1.20" },
            ],
            removeable: [{ name: "No Sauce" }, { name: "No Coleslaw" }],
            drinks: [{ name: "Coca Cola" }, { name: "Sprite" }, { name: "Water" }],
          },
        ],
      },
      {
        category: "Sandwiches",
        items: [
          {
            id: 6,
            name: "JACK DANIEL'S BURGER",
            desc: "Half-pound beef patty glazed with Jack Daniel's sauce, topped with cheddar, lettuce and tomato.",
            price: "€15.50",
            priceNum: 15.5,
            img: IMG.msw1,
            ingredients: [
              { name: "Extra Cheddar", price: "€1.50" },
              { name: "Bacon", price: "€2.00" },
              { name: "Avocado", price: "€1.80" },
            ],
            removeable: [{ name: "No Onion" }, { name: "No Tomato" }, { name: "No Lettuce" }],
            drinks: [
              { name: "Coca Cola" },
              { name: "Sprite" },
              { name: "Zup" },
              { name: "Coke" },
            ],
          },
          {
            id: 7,
            name: "CLASSIC CLUB",
            desc: "Triple-decker sandwich with turkey, bacon, lettuce, tomato and mayo on toasted bread.",
            price: "€13.90",
            priceNum: 13.9,
            img: IMG.msw2,
            ingredients: [
              { name: "Extra Turkey", price: "€1.50" },
              { name: "Extra Bacon", price: "€2.00" },
            ],
            removeable: [{ name: "No Mayo" }, { name: "No Tomato" }],
            drinks: [{ name: "Coca Cola" }, { name: "Sprite" }, { name: "Water" }],
          },
        ],
      },
      {
        category: "Pasta",
        items: [
          {
            id: 8,
            name: "CAJUN SHRIMP PASTA",
            desc: "Fettuccine with Cajun-spiced shrimp in a creamy Cajun cream sauce.",
            price: "€22.00",
            priceNum: 22,
            img: IMG.mp1,
            ingredients: [
              { name: "Extra Shrimp", price: "€3.00" },
              { name: "Extra Sauce", price: "€1.00" },
            ],
            removeable: [{ name: "No Spice" }, { name: "No Cream" }],
            drinks: [{ name: "White Wine" }, { name: "Sprite" }, { name: "Water" }],
          },
          {
            id: 9,
            name: "CHICKEN ALFREDO",
            desc: "Grilled chicken strips over fettuccine with rich, creamy Alfredo sauce and Parmesan.",
            price: "€20.50",
            priceNum: 20.5,
            img: IMG.mp2,
            ingredients: [
              { name: "Extra Parmesan", price: "€1.00" },
              { name: "Extra Chicken", price: "€2.50" },
            ],
            removeable: [{ name: "No Parmesan" }, { name: "No Pepper" }],
            drinks: [{ name: "Coca Cola" }, { name: "Sprite" }, { name: "Water" }, { name: "Juice" }],
          },
        ],
      },
      {
        category: "Desserts",
        items: [
          {
            id: 10,
            name: "BROWNIE OBSESSION",
            desc: "Warm Tennessee whiskey chocolate brownie, vanilla ice cream, caramel sauce and pecans.",
            price: "€8.90",
            priceNum: 8.9,
            img: IMG.md1,
            ingredients: [
              { name: "Extra Ice Cream", price: "€1.50" },
              { name: "Extra Caramel", price: "€0.80" },
            ],
            removeable: [{ name: "No Pecans" }, { name: "No Sauce" }],
            drinks: [{ name: "Coffee" }, { name: "Tea" }, { name: "Milk" }],
          },
          {
            id: 11,
            name: "CHEESECAKE",
            desc: "New York-style cheesecake with strawberry topping and whipped cream.",
            price: "€7.50",
            priceNum: 7.5,
            img: IMG.md2,
            ingredients: [
              { name: "Extra Strawberry", price: "€1.00" },
              { name: "Extra Cream", price: "€0.80" },
            ],
            removeable: [{ name: "No Topping" }, { name: "No Cream" }],
            drinks: [{ name: "Coffee" }, { name: "Tea" }, { name: "Juice" }],
          },
        ],
      },
    ],
  },
  "TGI FRIDAY'S MALL LIMASSOL": {
    hero: IMG.h2,
    sections: [
      {
        category: "Chicken",
        items: [
          {
            id: 1,
            name: "BUFFALO WINGS",
            desc: "Classic crispy wings tossed in tangy buffalo sauce, served with blue cheese dip.",
            price: "€14.90",
            priceNum: 14.9,
            img: IMG.mb1,
            ingredients: [
              { name: "Extra Sauce", price: "€0.80" },
              { name: "Blue Cheese", price: "€1.20" },
            ],
            removeable: [{ name: "No Sauce" }, { name: "No Dip" }],
            drinks: [{ name: "Coca Cola" }, { name: "Sprite" }, { name: "Beer" }],
          },
          {
            id: 2,
            name: "CRISPY TENDERS",
            desc: "Hand-battered tenders fried to perfection, served with honey mustard.",
            price: "€16.00",
            priceNum: 16,
            img: IMG.mb2,
            ingredients: [
              { name: "Extra Mustard", price: "€0.50" },
              { name: "Extra Tenders", price: "€3.00" },
            ],
            removeable: [{ name: "No Mustard" }, { name: "No Pepper" }],
            drinks: [{ name: "Coca Cola" }, { name: "Sprite" }, { name: "Water" }],
          },
        ],
      },
      {
        category: "Burgers",
        items: [
          {
            id: 3,
            name: "BACON SMASH",
            desc: "Smashed beef patty, crispy bacon, American cheese, pickles and special sauce.",
            price: "€17.50",
            priceNum: 17.5,
            img: IMG.mb3,
            ingredients: [
              { name: "Extra Bacon", price: "€2.00" },
              { name: "Extra Cheese", price: "€1.50" },
              { name: "Avocado", price: "€1.80" },
            ],
            removeable: [{ name: "No Pickles" }, { name: "No Onion" }, { name: "No Sauce" }],
            drinks: [
              { name: "Coca Cola" },
              { name: "Sprite" },
              { name: "Zup" },
              { name: "Coke" },
            ],
          },
          {
            id: 4,
            name: "MUSHROOM SWISS",
            desc: "Juicy patty loaded with sautéed mushrooms and melted Swiss cheese.",
            price: "€16.80",
            priceNum: 16.8,
            img: IMG.mb4,
            ingredients: [
              { name: "Extra Mushroom", price: "€1.50" },
              { name: "Extra Swiss", price: "€1.50" },
            ],
            removeable: [{ name: "No Mushroom" }, { name: "No Onion" }],
            drinks: [{ name: "Coca Cola" }, { name: "Water" }, { name: "Juice" }],
          },
        ],
      },
    ],
  },
};

export const ALL_RESTAURANTS = [
  {
    id: 1,
    name: "TGI FRIDAY'S",
    image: IMG.r1,
    delivery: "Free Delivery",
    hours: "09:00-12:00",
    distance: "2.2 Km",
    distNum: 2.2,
    category: "Popular",
    price: "High",
  },
  {
    id: 2,
    name: "TGI FRIDAY'S MALL LIMASSOL",
    image: IMG.r2,
    delivery: "Free Delivery",
    hours: "09:00-12:00",
    distance: "1.2 Km",
    distNum: 1.2,
    category: "Near By",
    price: "High",
  },
  {
    id: 3,
    name: "BURGER NATION",
    image: IMG.r3,
    delivery: "Free Delivery",
    hours: "10:00-23:00",
    distance: "0.8 Km",
    distNum: 0.8,
    category: "Hot Deals",
    price: "Low",
  },
  {
    id: 4,
    name: "MEDITERRANEAN BITES",
    image: IMG.r4,
    delivery: "€1.99 Delivery",
    hours: "11:00-22:00",
    distance: "3.1 Km",
    distNum: 3.1,
    category: "Spicy Food",
    price: "Low",
  },
  {
    id: 5,
    name: "SPICE GARDEN",
    image: IMG.r5,
    delivery: "Free Delivery",
    hours: "11:00-23:00",
    distance: "1.8 Km",
    distNum: 1.8,
    category: "Spicy Food",
    price: "Low",
  },
  {
    id: 6,
    name: "GREEN BOWL",
    image: IMG.r6,
    delivery: "Free Delivery",
    hours: "08:00-20:00",
    distance: "0.5 Km",
    distNum: 0.5,
    category: "Vegetables",
    price: "Low",
  },
  {
    id: 7,
    name: "OCEAN CATCH",
    image: IMG.r7,
    delivery: "€0.99 Delivery",
    hours: "12:00-22:00",
    distance: "4.0 Km",
    distNum: 4.0,
    category: "Sea Food",
    price: "High",
  },
  {
    id: 8,
    name: "SWEET ENDINGS",
    image: IMG.r8,
    delivery: "Free Delivery",
    hours: "10:00-21:00",
    distance: "2.6 Km",
    distNum: 2.6,
    category: "Deserts",
    price: "Low",
  },
];

export const CATEGORY_DATA = [
  { id: 1, name: "Popular", color: "#FF6B6B", img: IMG.cp },
  { id: 2, name: "Near By", color: "#4ECDC4", img: IMG.cn },
  { id: 3, name: "Hot Deals", color: "#FF8E53", img: IMG.ch },
  { id: 4, name: "Spicy Food", color: "#E53935", img: IMG.cs },
  { id: 5, name: "Deserts", color: "#F9A825", img: IMG.cd },
  { id: 6, name: "Vegetables", color: "#43A047", img: IMG.cv },
  { id: 7, name: "Sea Food", color: "#1565C0", img: IMG.csf },
  { id: 8, name: "Burgers", color: "#795548", img: IMG.cbg },
  { id: 9, name: "Pizza", color: "#F4511E", img: IMG.cpz },
  { id: 10, name: "Sushi", color: "#6A1B9A", img: IMG.csu },
];

export const PRICES = ["Low to High", "High to Low", "Low", "High"];

export const BANNERS = [
  {
    id: 1,
    eyebrow: "Gonna be a good day!",
    sub: "Get Fast",
    highlight: "500 Points",
    desc: "Order more then €144\nand get the 500 points",
    from: "#b71c1c",
    to: "#e53935",
    img: IMG.bn1,
  },
  {
    id: 2,
    eyebrow: "Weekend Special!",
    sub: "Enjoy",
    highlight: "20% OFF",
    desc: "On all orders above €30\nthis weekend only",
    from: "#0d47a1",
    to: "#1976d2",
    img: IMG.bn2,
  },
  {
    id: 3,
    eyebrow: "Free Delivery Day!",
    sub: "Zero fees on",
    highlight: "All Orders",
    desc: "Today only — no minimum\norder required",
    from: "#1b5e20",
    to: "#388e3c",
    img: IMG.bn3,
  },
];

export const DRAWER_LINKS = [
  { icon: "🏠", label: "Home" },
  { icon: "🍔", label: "Menu" },
  { icon: "📋", label: "My Orders" },
  { icon: "❤️", label: "Favourites" },
  { icon: "🎁", label: "Promotions" },
  { icon: "📍", label: "Addresses" },
  { icon: "💳", label: "Payment Methods" },
  { icon: "⚙️", label: "Settings" },
  { icon: "🚪", label: "Log Out" },
];

export function getRestaurantByName(name) {
  return ALL_RESTAURANTS.find((r) => r.name === name) || ALL_RESTAURANTS[0];
}

export function getMenuDataByRestaurantName(name) {
  return MENU[name] || MENU["TGI FRIDAY'S"];
}

