export const VendorCategories = [
  {
    name: "Venue Rental",
    value: "venuerental",
    icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/venuerental.svg`,
  },
  {
    name: "Food & Beverage",
    value: "foodandbeverage",
    icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/foodandbeverage.svg`,
  },
  {
    name: "Design and Decor",
    value: "decor",
    icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/decor.svg`,
  },
  {
    name: "Guest Services & Staffing",
    value: "corporatesocialresponsibility",
    icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/corporatesocialresponsibility.svg`,
  },
  {
    name: "Signage / Printing",
    value: "signageprinting",
    icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/signageprinting.svg`,
  },
  {
    name: "AV / Staging",
    value: "audiovisualstagingservices",
    icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/audiovisualstagingservices.svg`,
  },
  {
    name: "Giveaways",
    value: "giveaways",
    icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/swags.svg`,
  },
  {
    name: "Transportation & Tour operator",
    value: "transportation",
    icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/transportation.svg`,
  },
  {
    name: "Entertainment",
    value: "entertainment",
    icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/entertainment.svg`,
  },
  {
    name: "Security",
    value: "securityservices",
    icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/securityservices.svg`,
  },
  {
    name: "Videography and Photography",
    value: "videographyandphotography",
    icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/videographyandphotography.svg`,
  },
  {
    name: "Equipment Rentals",
    value: "equipmentrentals",
    icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/equipmentrentals.svg`,
  },
];
export const businessCategories = [
  {
    name: "venuerental",
    categories: [
      {
        name: "amenities",
        subCategories: [
          // {
          //   name: 'around the space',
          //   items: [
          //     {
          //       name: 'hotel acommondations within walking distance',
          //       type: Boolean,
          //       value: false,
          //       xIncluded: true,
          //     },
          //     {
          //       name: 'shopping centers',
          //       type: Boolean,
          //       value: false,
          //       xIncluded: true,
          //     },
          //     {
          //       name: 'dining options within walking distance',
          //       type: Boolean,
          //       value: false,
          //       xIncluded: true,
          //     },
          //   ]
          // },
          {
            name: "the space",
            items: [
              {
                name: "number of function spaces",
                type: Number,
                value: 1,
                xIncluded: true,
              },
              {
                name: "number of meeting rooms",
                type: Number,
                value: 1,
                xIncluded: true,
              },
              // {
              //   name: 'indoor event space',
              //   type: Boolean,
              //   value: false,
              //   xIncluded: true,
              // },
              // {
              //   name: 'outdoor event space',
              //   type: Boolean,
              //   value: false,
              //   xIncluded: true,
              // },
              {
                name: "Raw Event space",
                type: Boolean,
                value: false,
                xIncluded: true,
              },
              {
                name: "Furnished Event space",
                type: Boolean,
                value: false,
                xIncluded: true,
              },
              {
                name: "smoking section",
                type: Boolean,
                value: false,
                xIncluded: true,
              },
              {
                name: "separate cocktail hour space",
                type: Boolean,
                value: true,
                xIncluded: false,
              },
              {
                name: "outside area for guests",
                type: Boolean,
                value: true,
                xIncluded: false,
              },
              // {
              //   name: 'kitchen for outside caterers',
              //   type: Boolean,
              //   value: true,
              //   xIncluded: false,
              // },
              {
                name: "available bathrooms",
                type: Number,
                value: 1,
                xIncluded: true,
              },
              {
                name: "coat check",
                type: Boolean,
                value: null,
                xIncluded: false,
                comment: true,
              },
            ],
          },
          {
            name: "parking",
            items: [
              {
                name: "on site parking",
                type: Boolean,
                value: false,
                xIncluded: false,
              },
              {
                name: "on street parking",
                type: Boolean,
                value: false,
                xIncluded: true,
              },
            ],
          },
          // {
          //   name: 'lighting',
          //   items: [
          //     {
          //       name: 'artificial lighting',
          //       type: Boolean,
          //       value: false,
          //       xIncluded: true,
          //     },
          //     {
          //       name: 'natural lighting space',
          //       type: Boolean,
          //       value: false,
          //       xIncluded: true,
          //     },
          //     // {
          //     //   name: 'control of lighting during event',
          //     //   type: Boolean,
          //     //   value: false,
          //     //   xIncluded: true,
          //     // },
          //     {
          //       name: "light effects",
          //       type: Boolean,
          //       value: false,
          //       xIncluded: false,
          //       comment: true,
          //     }
          //   ]
          // },
          {
            name: "network",
            items: [
              // {
              //   name: 'fast reliable Wifi for guests',
              //   type: Boolean,
              //   value: false
              // },
              {
                name: "venue bandwidth (for video streaming or meeting content)",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "entertainment",
            items: [
              {
                name: "stage",
                type: Boolean,
                value: false,
              },
              {
                name: "dance floor",
                type: Boolean,
                value: false,
              },
            ],
          },
        ],
      },
      {
        name: "services",
        subCategories: [
          {
            name: "parking",
            items: [
              {
                name: "valet services",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "cleaning",
            items: [
              {
                name: "cleaning services during the event",
                type: Boolean,
                value: false,
              },
            ],
          },
        ],
      },
      {
        name: "accessibility",
        subCategories: [
          {
            name: " ",
            items: [
              {
                name: "accessbility for people with disabilities",
                type: Boolean,
                value: false,
                xIncluded: true,
              },
              {
                name: "accessible bathrooms",
                type: Number,
                value: 1,
                xIncluded: true,
              },
            ],
          },
        ],
      },
      {
        name: "equipment",
        subCategories: [
          {
            name: "furniture",
            items: [
              {
                name: "chairs",
                type: Boolean,
                value: false,
              },
              {
                name: "outdoor chairs",
                type: Boolean,
                value: false,
              },
              {
                name: "high chairs",
                type: Boolean,
                value: false,
              },
              {
                name: "tables",
                type: Boolean,
                value: false,
              },
              {
                name: "outdoor tables",
                type: Boolean,
                value: false,
              },
              {
                name: "high tables",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "power",
            items: [
              {
                name: "power supply",
                type: Boolean,
                value: false,
              },
              {
                name: "generator",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "AV",
            items: [
              {
                name: "microphones",
                type: Boolean,
                value: false,
                dry: null,
              },
              {
                name: "projector",
                type: Boolean,
                value: false,
                dry: null,
              },
              {
                name: "sound system",
                type: Boolean,
                value: false,
                dry: null,
              },
              {
                name: "LCD displays",
                type: Boolean,
                value: false,
                dry: null,
              },
              {
                name: "monitor",
                type: Boolean,
                value: false,
                dry: null,
              },
              {
                name: "Built in Screen",
                type: Boolean,
                value: false,
                dry: null,
              },
              {
                name: "Clickers",
                type: Boolean,
                value: false,
                dry: null,
              },
              {
                name: "Teleprompter",
                type: Boolean,
                value: false,
                dry: null,
              },
              {
                name: "Riser",
                type: Boolean,
                value: false,
                dry: null,
              },
              {
                name: "Switcher",
                type: Boolean,
                value: false,
                dry: null,
              },
              // {
              //   name: 'speaker / sound system',
              //   type: Boolean,
              //   value: false,
              //   dry: null,
              // },
            ],
          },
        ],
      },
      {
        name: "staff",
        subCategories: [
          {
            name: " ",
            items: [
              {
                name: "event coordinator",
                type: Boolean,
                value: false,
                staff: null,
                quest: null,
              },
              // {
              //   name: 'cleaning staff',
              //   type: Boolean,
              //   value: false,
              //   staff: null,
              //   quest: null,
              // },
              {
                name: "Catering and Waite Staff",
                type: Boolean,
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "security",
                type: Boolean,
                value: false,
                staff: null,
                quest: null,
              },
              // {
              //   name: 'receptionist',
              //   type: Boolean,
              //   value: false,
              //   staff: null,
              //   quest: null,
              // },
              {
                name: "technical support",
                type: Boolean,
                value: false,
                staff: null,
                quest: null,
              },
              // {
              //   name: 'bathroom attendant',
              //   type: Boolean,
              //   value: false,
              //   staff: null,
              //   quest: null,
              // },
            ],
          },
        ],
      },
      {
        name: "Sustainability, Inclusion and Diversity",
        subCategories: [
          {
            name: "Sustainability",
            items: [
              {
                name: "green policy applied",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: Boolean,
                value: false,
              },
              {
                name: "Non toxic products",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "Diversity",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                value: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "foodandbeverage",
    categories: [
      {
        name: "what we serve",
        subCategories: [
          {
            name: "food",
            items: [
              {
                name: "cuisine specialty",
                type: Array,
                value: [],
                available: [
                  "italian",
                  "french",
                  "spanish",
                  "german",
                  "belgian",
                  "american",
                  "Colombian",
                  "chinese",
                  "japanese",
                  "mexican",
                  "indian",
                  "farm-to-table",
                  "Peruvian",
                  "Argentine",
                  "Thai",
                  "Cuban",
                  "Greek",
                ],
              },
              {
                name: "food specialties",
                type: Array,
                value: [],
                available: [
                  "raw seafood bar",
                  "sushi station",
                  "special desserts",
                  "food truck",
                  "ice cream truck",
                  "salad stations",
                  "crudite stations",
                  "barbeque",
                  "brickoven station",
                ],
              },
              {
                name: "food preparation location",
                type: Array,
                value: [],
                available: ["on premisses", "off premises"],
                hasComment: true,
              },
              {
                name: "caterer type",
                type: Array,
                value: [],
                available: ["full service", "drop-off service"],
              },
            ],
          },
          {
            name: "beverage",
            items: [
              {
                name: "specialty liquor stations",
                type: Array,
                value: [],
                available: [
                  "beer",
                  "wine",
                  "tequila",
                  "cocktail",
                  "mixology",
                  "martini",
                  "bourbon",
                  "whiskey",
                  "Vodka",
                  "Rum",
                  "Margaritas",
                  "Champagne",
                ],
              },
              {
                name: "specialty bar services",
                type: Boolean,
                value: false,
              },
              // {
              //   name: 'non alcoholic specials',
              //   type: Array,
              //   value: [],
              //   available: ['smoothies & juices', 'hawaiian', 'coffee', 'tea', 'power drinks']
              // },
              {
                name: "non alcoholic specials",
                type: Number,
                value: 0,
                // xIncluded: true,
                // available: ['smoothies & juices', 'hawaiian', 'coffee', 'tea', 'power drinks']
              },
            ],
          },
        ],
      },
      {
        name: "services",
        subCategories: [
          {
            name: "serving styles",
            items: [
              {
                name: "appetizers",
                type: Boolean,
                value: false,
                available: ["appetizers", "passed hors doeuvres", "stations", "buffet", "plated"],
              },
            ],
          },
          {
            name: "meal type",
            items: [
              {
                name: "breakfast",
                type: Array,
                value: [],
                available: [
                  "egg station",
                  "bread station",
                  "avocado station",
                  "cereal station",
                  "health drinks",
                  "fresh fruit",
                  "yogurt bar",
                  "pancake/waffle station",
                ],
              },
              {
                name: "lunch",
                type: Boolean,
                value: false,
                xIncluded: true,
              },
              {
                name: "dinner",
                type: Boolean,
                value: false,
                xIncluded: true,
              },
              {
                name: "snacks",
                type: Boolean,
                value: false,
                xIncluded: true,
              },
              {
                name: "desserts",
                type: Boolean,
                value: false,
                xIncluded: true,
              },
            ],
          },
          {
            name: "other",
            items: [
              {
                name: "table setup and preparations",
                type: Boolean,
                value: false,
              },
              {
                name: "interactive stations",
                type: Boolean,
                value: false,
              },
              {
                name: "set up centerpieces, name cards, favors, etc",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "cleaning",
            items: [
              {
                name: "breakdown, cleaning and pickup",
                type: Boolean,
                value: false,
              },
            ],
          },
        ],
      },
      {
        name: "equipment",
        subCategories: [
          {
            name: "furniture",
            items: [
              {
                name: "chairs",
                type: Boolean,
                value: false,
              },
              {
                name: "tables",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "tableware",
            items: [
              {
                name: "linens & tablecloth",
                type: Boolean,
                value: false,
              },
              {
                name: "glassware",
                type: Boolean,
                value: false,
              },
              {
                name: "Utensils",
                type: Boolean,
                value: false,
              },
              {
                name: "disposables",
                type: Boolean,
                value: false,
              },
              {
                name: "Plateware",
                type: Boolean,
                value: false,
              },
              {
                name: "customized items",
                type: Boolean,
                value: false,
              },
              {
                name: "table decor",
                type: Array,
                value: [],
                available: ["candles", "flower arrangement", "napkins", "napkin huggers", "other"],
                hasComment: true,
              },
            ],
          },
        ],
      },
      {
        name: "staff",
        subCategories: [
          {
            name: "onsite managers",
            items: [
              {
                name: "captain",
                type: Boolean,
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "maltre d",
                type: Boolean,
                value: false,
                staff: null,
                quest: null,
              },
            ],
          },
          {
            name: "chefs and cooks",
            items: [
              {
                name: "chef",
                type: Boolean,
                value: false,
              },
              {
                name: "specialty chef",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "other",
            items: [
              {
                name: "servers",
                type: Boolean,
                value: false,
              },
              {
                name: "busboys",
                type: Boolean,
                value: false,
              },
              {
                name: "cleanup crew",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "waitstaff",
            items: [
              {
                name: "waitstaff",
                type: Boolean,
                value: false,
              },
              {
                name: "number of waitstaff",
                hasComment: true,
                type: Number,
                value: 0,
                xIncluded: true,
              },
              {
                name: "attire of waitstaff",
                type: Array,
                value: [],
                available: ["suits/tux", "customized color", "branded"],
              },
            ],
          },
        ],
      },
      {
        name: "Sustainability, Inclusion and Diversity",
        subCategories: [
          {
            name: "Sustainability",
            items: [
              {
                name: "green policy applied",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Non toxic products",
                type: Boolean,
                value: false,
                xIncluded: true,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "vegetarian",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "vegan",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "gluten - free",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "egg free",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "kosher",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "halal",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Diversity",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "decor",
    categories: [
      {
        name: "services",
        subCategories: [
          {
            name: "setup, cleanup and delivery",
            items: [
              {
                name: "customer pickup",
                type: Boolean,
                value: false,
              },
              {
                name: "deliveries",
                type: Number,
                value: 0,
              },
              {
                name: "onsite setup",
                type: Boolean,
                value: false,
              },
              {
                name: "cleanup",
                type: Boolean,
                value: false,
              },
              {
                name: "Installation & Removal of Old items",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "specialties",
            items: [
              {
                name: "digital decor",
                type: Boolean,
                value: false,
              },
              {
                name: "holiday decor",
                type: Boolean,
                value: false,
              },
              {
                name: "decor in motion",
                type: Boolean,
                value: false,
              },
              {
                name: "live decor",
                type: Boolean,
                value: false,
              },
              {
                name: "lighting decor",
                type: Boolean,
                value: false,
              },
              {
                name: "specialized theme designs",
                type: Boolean,
                value: false,
              },
              {
                name: "flower decor",
                type: Boolean,
                value: false,
              },
              {
                name: "designs serivces",
                type: Boolean,
                value: false,
              },
            ],
          },
        ],
      },
      {
        name: "amenities",
        subCategories: [
          {
            name: "floral",
            items: [
              {
                name: "Plants",
                type: Boolean,
                value: false,
              },
              {
                name: "Extra flowers for caterer (boufet decor)",
                type: Boolean,
                value: false,
              },
              {
                name: "Refrigerated Truck",
                type: Boolean,
                value: false,
              },
              {
                name: "Permanent botanical arrangements",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "other",
            items: [
              {
                name: "special effects (pyrotechnic, waterfall, baloon, explosion, etc)",
                type: Boolean,
                value: false,
              },
              {
                name: "props",
                type: Boolean,
                value: false,
              },
            ],
          },
        ],
      },
      {
        name: "Sustainability, Inclusion and Diversity",
        subCategories: [
          {
            name: "Sustainability",
            items: [
              {
                name: "green policy applied",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Non toxic products",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "hypoallergenic flowers",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "non scented flowers",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Diversity",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "corporatesocialresponsibility",
    categories: [
      {
        name: "services",
        subCategories: [
          {
            name: "staffing",
            items: [
              {
                name: "event staffing",
                type: Boolean,
                value: false,
              },
              {
                name: "transportation host",
                type: Boolean,
                value: false,
              },
              {
                name: "models",
                type: Boolean,
                value: false,
              },
              {
                name: "staffing services",
                type: Array,
                value: [],
                available: ["tour guide", "wait staff", "event registration"],
              },
              {
                name: "hospitality professional",
                type: Boolean,
                value: false,
              },
              {
                name: "Food Server",
                type: Boolean,
                value: false,
              },
              {
                name: "Administrative Duties",
                type: Boolean,
                value: false,
              },
              {
                name: "Accounting",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "guest services",
            items: [
              {
                name: "general guest services",
                type: Boolean,
                value: false,
              },
              {
                name: "consierge services",
                type: Boolean,
                value: false,
              },
              {
                name: "VIP services",
                type: Boolean,
                value: false,
              },
              {
                name: "day-of coordination",
                type: Boolean,
                value: false,
              },
              {
                name: "hosting",
                type: Boolean,
                value: false,
              },
              {
                name: "tours & sightseeing",
                type: Boolean,
                value: false,
              },
              {
                name: "visiting guest services support",
                type: Array,
                value: [],
                available: ["laudry", "wellness", "entertainment"],
              },
              {
                name: "last minute onsite fitting (tux, suits)",
                type: Boolean,
                value: false,
              },
            ],
          },
        ],
      },
      {
        name: "amenities",
        subCategories: [
          {
            name: " ",
            items: [
              {
                name: "suit / tuxido rentals",
                type: Boolean,
                value: false,
              },
            ],
          },
        ],
      },
      {
        name: "Sustainability, Inclusion and Diversity",
        subCategories: [
          {
            name: "Sustainability",
            items: [
              {
                name: "green policy applied",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Non toxic products",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Diversity",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "videographyandphotography",
    categories: [
      {
        name: "services",
        subCategories: [
          {
            name: "style",
            items: [
              {
                name: "journalistic",
                type: Boolean,
                value: false,
              },
              {
                name: "studio",
                type: Boolean,
                value: false,
              },
              {
                name: "traditional",
                type: Boolean,
                value: false,
              },
              {
                name: "candid",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "editing",
            items: [
              {
                name: "video",
                type: Boolean,
                value: false,
              },
              {
                name: "audio",
                type: Boolean,
                value: false,
              },
              {
                name: "photo",
                type: Boolean,
                value: false,
              },
              {
                name: "photo invitations / thank you",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "format of delivery",
            items: [
              {
                name: "physical proof/print",
                type: Boolean,
                value: false,
              },
              {
                name: "flash drive",
                type: Boolean,
                value: false,
              },
              {
                name: "digital download",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "setup & breakdown",
            items: [
              {
                name: "adapt equipment mobility to program",
                type: Number,
                value: 0,
              },
              {
                name: "setup & breakdown",
                type: Boolean,
                value: 0,
              },
            ],
          },
        ],
      },
      {
        name: "amenities",
        subCategories: [
          {
            name: "specialties",
            items: [
              {
                name: "drone and remote photo/video",
                type: "Cost",
                value: 0,
              },
              {
                name: "crane",
                type: Boolean,
                value: false,
              },
              {
                name: "simulacasting/live streaming",
                type: Boolean,
                value: false,
              },
            ],
          },
        ],
      },
      {
        name: "Sustainability, Inclusion and Diversity",
        subCategories: [
          {
            name: "Sustainability",
            items: [
              {
                name: "green policy applied",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Non toxic products",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "Diversity",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                value: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "signageprinting",
    categories: [
      {
        name: "services",
        subCategories: [
          {
            name: "PR",
            items: [
              {
                name: "speech writing",
                type: Boolean,
                value: false,
              },
              {
                name: "press releases",
                type: Boolean,
                value: false,
              },
              {
                name: "high profile sourcing",
                type: Array,
                value: [],
                available: ["politicians", "celebrities", "influencers", "artists"],
              },
              {
                name: "social media promotion",
                type: Boolean,
                value: false,
              },
              {
                name: "media pitch",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "marketing",
            items: [
              {
                name: "branding strategy",
                type: Boolean,
                value: false,
              },
              {
                name: "consultation",
                type: Boolean,
                value: false,
              },
              {
                name: "Website Development",
                type: Boolean,
                value: false,
              },
              {
                name: "Digital Newsletter",
                type: Boolean,
                value: false,
              },
              {
                name: "e-Marketing Strategies",
                type: Boolean,
                value: false,
              },
              {
                name: "Catalog (Digital & Print)",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "print services",
            items: [
              {
                name: "Invitations",
                type: Boolean,
                value: false,
              },
              {
                name: "Menus",
                type: Boolean,
                value: false,
              },
              {
                name: "Place cards",
                type: Boolean,
                value: false,
              },
              {
                name: "Tent cards",
                type: Boolean,
                value: false,
              },
              {
                name: "Post Cards",
                type: Boolean,
                value: false,
              },
              {
                name: "Business Cards",
                type: Boolean,
                value: false,
              },
              {
                name: "Large Print Items (Blueprints, CAD Drawings)",
                type: Boolean,
                value: false,
              },
              {
                name: "Binding & Laminating",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "Signage",
            items: [
              {
                name: "Posters",
                type: Boolean,
                value: false,
              },
              {
                name: "Banners",
                type: Boolean,
                value: false,
              },
              {
                name: "Presentation Boards",
                type: Boolean,
                value: false,
              },
              {
                name: "Window Graphics",
                type: Boolean,
                value: false,
              },
              {
                name: "Outdoor Signage",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "graphics",
            items: [
              {
                name: "graphic design services",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "administrative",
            items: [
              {
                name: "guest lists",
                type: Boolean,
                value: false,
              },
              {
                name: "translation",
                type: Boolean,
                value: false,
              },
              {
                name: "transcription",
                type: Boolean,
                value: false,
              },
            ],
          },
        ],
      },
      {
        name: "amenities",
        subCategories: [
          {
            name: "printing",
            items: [
              {
                name: "printing method",
                type: Array,
                value: [],
                available: [
                  "digital printing",
                  "screen printing",
                  "flexography printing",
                  "litho printing",
                  "transfer printing",
                  "engraving",
                  "embossing",
                  "embrolder printing",
                ],
              },
              {
                name: "printing material",
                type: Array,
                value: [],
                available: [
                  "business cards",
                  "brochures",
                  "flyers",
                  "one-sheets",
                  "infographics",
                  "instructions",
                  "posters",
                  "tickets",
                  "banners",
                  "menues",
                  "place cards",
                  "other",
                ],
              },
            ],
          },
          {
            name: "specialty",
            items: [
              {
                name: "custom prints",
                type: Boolean,
                value: false,
              },
              {
                name: "branded lighting effect",
                type: Boolean,
                value: false,
              },
            ],
          },
        ],
      },
      {
        name: "Sustainability, Inclusion and Diversity",
        subCategories: [
          {
            name: "Sustainability",
            items: [
              {
                name: "green policy applied",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Non toxic products",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "Diversity",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                value: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "transportation",
    categories: [
      {
        name: "services",
        subCategories: [
          {
            name: " ",
            items: [
              {
                name: "taxi",
                type: Boolean,
                value: false,
              },
              {
                name: "airport pickup/drop off",
                type: Boolean,
                value: false,
              },
              {
                name: "round trip",
                type: Boolean,
                value: false,
              },
              {
                name: "one way",
                type: Boolean,
                value: false,
              },
              {
                name: "tours",
                type: Boolean,
                value: false,
              },
            ],
          },
        ],
      },
      {
        name: "staff",
        subCategories: [
          {
            name: " ",
            items: [
              {
                name: "uniformed drivers",
                type: Boolean,
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "transportation coordinator",
                type: Boolean,
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "uniform style",
                type: Boolean,
                value: "",
                staff: null,
                quest: null,
              },
              {
                name: "certified safe drive",
                type: Boolean,
                value: false,
                staff: null,
                quest: null,
              },
            ],
          },
        ],
      },
      {
        name: "amenities",
        subCategories: [
          {
            name: " ",
            items: [
              {
                name: "wifi",
                type: Boolean,
                value: false,
              },
              {
                name: "bar",
                type: Boolean,
                value: false,
              },
              {
                name: "luggage",
                type: Boolean,
                value: false,
              },
              {
                name: "food",
                type: Boolean,
                value: false,
              },
              {
                name: "TV/Cable TV",
                type: Boolean,
                value: false,
              },
              {
                name: "restrooms",
                type: Boolean,
                value: false,
              },
            ],
          },
        ],
      },
      {
        name: "Sustainability, Inclusion and Diversity",
        subCategories: [
          {
            name: "Sustainability",
            items: [
              {
                name: "green policy applied",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Non toxic products",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Diversity",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "entertainment",
    categories: [
      {
        name: "services",
        subCategories: [
          {
            name: "DJ services",
            items: [
              {
                name: "DJ",
                type: Boolean,
                value: false,
              },
              {
                name: "instrument",
                type: Boolean,
                value: false,
              },
              {
                name: "vocalist",
                type: Boolean,
                value: false,
              },
              {
                name: "motivators",
                type: Boolean,
                value: false,
              },
              {
                name: "specialty DJ(ethnic music)",
                type: Boolean,
                value: false,
              },
              {
                name: "Act as MC",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "band",
            items: [
              {
                name: "one man instrument",
                type: Boolean,
                value: false,
              },
              {
                name: "trio",
                type: Boolean,
                value: false,
              },
              {
                name: "quartet",
                type: Boolean,
                value: false,
              },
              {
                name: "vocalist",
                type: Boolean,
                value: false,
              },
              {
                name: "orchestra",
                type: Boolean,
                value: false,
              },
              {
                name: "nine pieces and plus",
                type: Boolean,
                value: false,
              },
              {
                name: "specialty band (ethnic music, rock and roll etc)",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "type of entertainment",
            items: [
              {
                name: "interactive",
                type: Array,
                value: [],
                available: ["photo booth", "casino games", "sport games", "make your own"],
              },
              {
                name: "singers",
                type: Boolean,
                value: false,
              },
              {
                name: "keynote speaker / special MC",
                type: Boolean,
                value: false,
              },
              {
                name: "theme entertainment ( dancers, shows, illusionist etc )",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "activities",
            items: [
              {
                name: "team building",
                type: Boolean,
                value: false,
              },
              {
                name: "events and shows",
                type: Boolean,
                value: false,
              },
              {
                name: "museum & art gallery visits",
                type: Boolean,
                value: false,
              },
              {
                name: "classes",
                type: Boolean,
                value: false,
              },
              {
                name: "sport",
                type: Boolean,
                value: false,
              },
              {
                name: "family activities",
                type: Boolean,
                value: false,
              },
              {
                name: "children activities",
                type: Boolean,
                value: false,
              },
              {
                name: "food",
                type: Boolean,
                value: false,
              },
              {
                name: "wine/beer/bourbon/etc",
                type: Boolean,
                value: false,
              },
              {
                name: "sightseeing",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "setup, guidance & cleanup",
            items: [
              {
                name: "onsite coordinatores, instructors, guides",
                type: Boolean,
                value: false,
              },
              {
                name: "setup/breakdown hours included",
                type: Boolean,
                value: false,
                unit: "hour",
              },
            ],
          },
        ],
      },
      {
        name: "amenities",
        subCategories: [
          {
            name: " ",
            items: [
              {
                name: "audio equipment",
                type: Boolean,
                value: false,
              },
              {
                name: "stage light",
                type: Boolean,
                value: false,
              },
              {
                name: "dance floor",
                type: Boolean,
                value: false,
              },
              {
                name: "specialty lighting (pinpoint, strobe)",
                type: Boolean,
                value: false,
              },
              {
                name: "theatrical staging",
                type: Boolean,
                value: false,
              },
            ],
          },
        ],
      },
      {
        name: "accessibility",
        subCategories: [
          {
            name: " ",
            items: [
              {
                name: "activity is suitable for people with disabilities",
                type: Boolean,
                value: false,
              },
            ],
          },
        ],
      },
      {
        name: "Sustainability, Inclusion and Diversity",
        subCategories: [
          {
            name: "Sustainability",
            items: [
              {
                name: "green policy applied",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Non toxic products",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Diversity",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "securityservices",
    categories: [
      {
        name: "services",
        subCategories: [
          {
            name: "other",
            items: [
              {
                name: "risk assessment",
                type: Boolean,
                value: false,
              },
              {
                name: "VIP security",
                type: Boolean,
                value: false,
              },
              {
                name: "executive protection",
                type: Boolean,
                value: false,
              },
              {
                name: "disaster security team",
                type: Boolean,
                value: false,
              },
              {
                name: "active shooter",
                type: Boolean,
                value: false,
              },
              {
                name: "training",
                type: Boolean,
                value: false,
              },
              {
                name: "firearms training",
                type: Boolean,
                value: false,
              },
              {
                name: "K9 detection services",
                type: Boolean,
                value: false,
              },
              {
                name: "licensed to carry fire arms",
                type: Boolean,
                value: false,
              },
              {
                name: "parameter security",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "staff",
            items: [
              {
                name: "chaperones",
                type: Boolean,
                value: false,
                // xIncluded: true,
                staff: null,
                quest: null,
              },
              {
                name: "patrolling officers",
                type: Boolean,
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "bouncers",
                type: Boolean,
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "body guards",
                type: Boolean,
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "armed security officers",
                type: Boolean,
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "unarmed security",
                type: Boolean,
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "undercover",
                type: Boolean,
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "crowd control",
                type: Boolean,
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "certified security personnel ",
                type: Boolean,
                value: false,
                staff: null,
                quest: null,
              },
            ],
          },
        ],
      },
      {
        name: "amenities",
        subCategories: [
          {
            name: " ",
            items: [
              {
                name: "special equipment",
                type: Number,
                value: 0,
                hideLabelForValue: true
              },
            ],
          },
        ],
      },
      {
        name: "Sustainability, Inclusion and Diversity",
        subCategories: [
          {
            name: "Sustainability",
            items: [
              {
                name: "green policy applied",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Non toxic products",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Diversity",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "audiovisualstagingservices",
    categories: [
      {
        name: "amenities",
        subCategories: [
          {
            name: "audio",
            items: [
              {
                name: "sound system",
                type: Boolean,
                value: false,
              },
              {
                name: "production",
                type: Boolean,
                value: false,
              },
              {
                name: "Backdrop/Scenic & Decor",
                type: Boolean,
                value: false,
              },
              {
                name: "rigging",
                type: Boolean,
                value: false,
              },
              {
                name: "programmer",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "visual",
            items: [
              {
                name: "screens",
                type: Array,
                value: [],
                available: ["projectors(rear or font)", "plasma/LED tv", "LED wall", "show and go screen"],
              },
              {
                name: "ZAP shots",
                type: Boolean,
                value: false,
              },
              {
                name: "cranes",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "Show Management",
            items: [
              {
                name: "Event Services",
                type: Boolean,
                value: false,
              },
              {
                name: "Outdoor Staging & Tents",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "other",
            items: [
              {
                name: "special effects",
                type: Boolean,
                value: false,
              },
              {
                name: "special equipment",
                type: Boolean,
                value: false,
              },
              {
                name: "simulcasting",
                type: Boolean,
                value: false,
              },
              {
                name: "cordless mics",
                type: Boolean,
                value: false,
              },
            ],
          },
        ],
      },
      {
        name: "services",
        subCategories: [
          {
            name: "staff",
            items: [
              {
                name: "sound/visual engineer",
                type: Boolean,
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "setup crew",
                type: Boolean,
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "programmer",
                type: Boolean,
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "event manager",
                type: Boolean,
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "rigging",
                type: Boolean,
                value: false,
                staff: null,
                quest: null,
              },
            ],
          },
        ],
      },
      {
        name: "Sustainability, Inclusion and Diversity",
        subCategories: [
          {
            name: "Sustainability",
            items: [
              {
                name: "green policy applied",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Non toxic products",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Diversity",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                value: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "giveaways",
    categories: [
      {
        name: "amenities",
        subCategories: [
          {
            name: "variety of inventory",
            items: [
              {
                name: "ceremonial items",
                type: Boolean,
                value: false,
              },
              {
                name: "specialty food & liquor",
                type: Boolean,
                value: false,
              },
              {
                name: "tech items",
                type: Boolean,
                value: false,
              },
              {
                name: "apparel",
                type: Boolean,
                value: false,
              },
              {
                name: "drinkware",
                type: Boolean,
                value: false,
              },
              {
                name: "bags",
                type: Boolean,
                value: false,
              },
              {
                name: "wellness",
                type: Boolean,
                value: false,
              },
              {
                name: "fitness",
                type: Boolean,
                value: false,
              },
              {
                name: "office",
                type: Boolean,
                value: false,
              },
              {
                name: "travel",
                type: Boolean,
                value: false,
              },
              {
                name: "outdoor/leisure",
                type: Boolean,
                value: false,
              },
              {
                name: "stationary",
                type: Boolean,
                value: false,
              },
              {
                name: "wellness",
                type: Boolean,
                value: false,
              },
              {
                name: "safety",
                type: Boolean,
                value: false,
              },
              {
                name: "other",
                type: String,
                value: "",
              },
            ],
          },
        ],
      },
      {
        name: "services",
        subCategories: [
          {
            name: " ",
            items: [
              {
                name: "ability to handle rushed orders",
                type: Boolean,
                value: false,
              },
              {
                name: "graphic design",
                type: Boolean,
                value: false,
              },
              {
                name: "ability to handle special requests",
                type: Boolean,
                value: false,
              },
              {
                name: "printing",
                type: Boolean,
                value: false,
              },
              {
                name: "stuffing and packaging",
                type: Boolean,
                value: false,
              },
              {
                name: "customization",
                type: Boolean,
                value: false,
              },
            ],
          },
        ],
      },
      {
        name: "Sustainability, Inclusion and Diversity",
        subCategories: [
          {
            name: "Sustainability",
            items: [
              {
                name: "green policy applied",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Non toxic products",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "provide sample",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "proof",
                type: Array,
                value: [],
                available: ["digital", "real", "sample"],
              },
            ],
          },
          {
            name: "Diversity",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "equipmentrentals",
    categories: [
      {
        name: "services",
        subCategories: [
          {
            name: " ",
            items: [
              {
                name: "onsite supervisors during event",
                type: Boolean,
                value: false,
              },
              {
                name: "special delivery and pickup",
                type: Boolean,
                value: false,
              },
              {
                name: "pre-inspection",
                type: Boolean,
                value: false,
              },
              {
                name: "set-up & tear-Down",
                type: Boolean,
                value: false,
              },
            ],
          },
        ],
      },
      {
        name: "amenities",
        subCategories: [
          {
            name: "furniture",
            items: [
              {
                name: "chairs",
                type: Boolean,
                value: false,
              },
              {
                name: "tables",
                type: Boolean,
                value: false,
              },
              {
                name: "tableware",
                type: Boolean,
                value: false,
              },
              {
                name: "special catering rental equipment",
                type: Boolean,
                value: false,
              },
              {
                name: "table coverings",
                type: Boolean,
                value: false,
              },
              {
                name: "furniture / props",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "tech equipment",
            items: [
              {
                name: "screens",
                type: Boolean,
                value: false,
              },
              {
                name: "projections",
                type: Boolean,
                value: false,
              },
              {
                name: "recordings",
                type: Boolean,
                value: false,
              },
              {
                name: "video conferencing",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "tents",
            items: [
              {
                name: "tents",
                type: Boolean,
                value: false,
              },
              {
                name: "air conditioning",
                type: Boolean,
                value: false,
              },
              {
                name: "generator",
                type: Boolean,
                value: false,
              },
              {
                name: "tent lighting",
                type: Boolean,
                value: false,
              },
              {
                name: "flooring and carpeting",
                type: Boolean,
                value: false,
              },
              {
                name: "portable bathrooms",
                type: Boolean,
                value: false,
              },
              {
                name: "liners",
                type: Boolean,
                value: false,
              },
            ],
          },
          {
            name: "other",
            items: [
              {
                name: "staging, podiums, registration areas",
                type: Boolean,
                value: false,
              },
            ],
          },
        ],
      },
      {
        name: "Sustainability, Inclusion and Diversity",
        subCategories: [
          {
            name: "Sustainability",
            items: [
              {
                name: "green policy applied",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Non toxic products",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Diversity",
            items: [
              {
                name: "Prioritizing diversity and inclution",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: Boolean,
                xIncluded: true,
                value: false,
              },
            ],
          },
        ],
      },
    ],
  },
];
export const generalInfos = [
  {
    name: "venuerental",
    items: [
      {
        name: "recently renovated (up to 3 years)",
        type: Boolean,
        value: false,
      },
    ],
  },
  {
    name: "foodandbeverage",
    items: [
      {
        name: "seasonal menu update (at least twice anual)",
        type: Boolean,
        value: false,
      },
    ],
  },
  {
    name: "transportation",
    items: [
      {
        name: "years new cars are kept in inventory",
        type: Array,
        value: [],
        available: ["1-2 years", "3-4 years", "5+ years"],
      },
    ],
  },
  {
    name: "entertainment",
    items: [
      {
        name: "amount of yearly corporate events out of total events",
        type: Number,
        value: 0,
      },
      {
        name: "perform at more than one vent per day?",
        type: Boolean,
        value: false,
      },
    ],
  },
  {
    name: "equipmentrentals",
    items: [
      {
        name: "inventory update-rate",
        type: String,
        value: "",
      },
    ],
  },
];
export const companyServices = [
  {
    name: "venuerental",
    type: Array,
    value: [],
    available: [
      "ballroom",
      "gallery",
      "park or field or garden",
      "historic establishment",
      "bar or pub or club",
      "restaurant",
      "Meeting Room",
      "Theatre",
      "business center",
      "community center",
      "sport venue",
      "academic venue",
      "stately home",
      "stadium or arena",
    ],
  },
  {
    name: "foodandbeverage",
    type: Array,
    value: [],
    available: ["Food catering", "Beverage"],
  },
  {
    name: "decor",
    type: Array,
    value: [],
    available: ["floral", "lighting", "interior design"],
  },
  {
    name: "corporatesocialresponsibility",
    type: Array,
    value: [],
    available: ["staffing", "guest services", "on-day coodination", "concierge"],
  },
  {
    name: "signageprinting",
    type: Array,
    value: [],
    available: ["PR", "marketing", "printing", "graphic design"],
  },
  // {
  //   name: 'advertising-promotion',
  //   type: Array,
  //   value: [],
  //   available: [],
  // },
  // {
  //   name: 'transportation',
  //   type: Array,
  //   value: [],
  //   available: [],
  // },
  {
    name: "audiovisualstagingservices",
    type: Array,
    value: [],
    available: ["audio", "visual", "staging options"],
  },
  {
    name: "giveaways",
    type: Array,
    value: [],
    available: ["favors", "promotional", "marketing/promotional Items"],
  },
  {
    name: "entertainment",
    type: Array,
    value: [],
    available: ["DJ services", "band", "indoor activities", "outdoor activities", "family activities", "entertainment"],
  },
  {
    name: "securityservices",
    type: Array,
    value: [],
    available: ["day-of security", "security consultation", "personal security"],
  },
  {
    name: "videographyandphotography",
    type: Array,
    value: [],
    available: ["photography", "videography"],
  },
  {
    name: "equipmentrentals",
    type: Array,
    value: [],
    available: ["tents", "technical equipment", "furniture", "constumes", "props & decor"],
  },
];
export const VendorPolicy = [
  {
    category: "venuerental",
    items: [
      // {
      //   name: 'Allowed use of outside vendors',
      //   type: Boolean,
      // },

      {
        name: "Suitable for infants",
        type: Boolean,
        hasComment: true,
      },
      {
        name: "Audio restrictions",
        type: Boolean,
        hasComment: true,
      },
      {
        name: "Decor restrictions",
        type: Boolean,
        hasComment: true,
      },
      {
        name: "Dress code",
        type: Boolean,
        hasComment: true,
      },
      {
        name: "Dry Hire",
        type: Boolean,
        hasComment: true,
      },
      {
        name: "Pets",
        type: Boolean,
        hasComment: true,
      },
    ],
  },
  {
    category: "foodandbeverage",
    items: [
      {
        name: "Tastings prior to booking",
        type: Boolean,
        cost: null,
      },
      {
        name: "Allow customer provided liquor",
        type: Boolean,
      },
    ],
  },
  {
    category: "decor",
    items: [
      {
        name: "Room temperature constraints(for flowers)",
        type: Boolean,
      },
      {
        name: "Flexible time requirement for setup",
        type: Boolean,
      },
      {
        name: "Working with unions",
        type: Boolean,
      },
    ],
  },
  {
    category: "corporatesocialresponsibility",
    items: [
      {
        name: "Minimum hour of service",
        type: Number,
        noSuffix: true,
        hasComment: true,
      },
      {
        name: "Max guest to staff ratio",
        type: Number,
        isPercentage: true,
      },
      {
        name: "Work with Unions",
        type: Boolean,
      },
    ],
  },
  {
    category: "signageprinting",
    items: [
      {
        name: "Must use in house graphics designer",
        type: Boolean,
        hasComment: true,
      },
      {
        name: "Number of PR drafts",
        type: Number,
        noSuffix: true,
        hasComment: true,
      },
      {
        name: "Customizable size of prints",
        type: Boolean,
        hasComment: true,
      },
      {
        name: "Minimum number of prints",
        type: Number,
        noSuffix: true,
        hasComment: true,
      },
    ],
  },
  {
    category: "advertising-promotion",
    items: [],
  },
  {
    category: "equipmentrentals",
    items: [
      {
        name: "Minimum time needed for setup",
        type: Number,
        noSuffix: true,
        hasComment: true,
      },
      {
        name: "Minimum tent time needed for set up",
        type: Number,
        noSuffix: true,
        hasComment: true,
      },
    ],
  },
  {
    category: "audiovisualstagingservices",
    items: [
      {
        name: "Accept staff attire request",
        type: Boolean,
      },
      {
        name: "Simulcasting bandwidth requirements",
        type: Number,
      },
      {
        name: "Union crew restrictions",
        type: Boolean,
        hasComment: true,
      },
    ],
  },
  {
    category: "giveaways",
    items: [
      {
        name: "Allow pickup",
        type: Boolean,
      },
      {
        name: "Minimum size order",
        type: String,
      },
    ],
  },
  {
    category: "shipping",
    items: [],
  },
  {
    category: "transportation",
    items: [
      {
        name: "Hourly Reservation Minimum",
        type: Boolean,
        hasComment: true,
      },
      {
        name: "Airports Pickup Delays",
        hasComment: true,
        placeholder:
          "Company monitors all commercial airline arrivals to ensure on-time airport pickups. A forty-five (45) minute grace period is allowed on all domestic arrivals and seventy-five (75) minutes on all international arrivals. Waiting time charges will apply after the grace period and are accrued in quarter-hour increments, based on the vehicle’s hourly rate.",
      },
      {
        name: "Non-Airport Pickup Delays",
        hasComment: true,
        placeholder:
          "Customers are granted a window of time to greet their chauffeurs at the requested pick-up time and location before incurring waiting time charges. Standard grace period is (15) minutes before charges are incurred. ",
      },
      {
        name: "No show",
        hasComment: true,
        placeholder:
          "A reservation is considered a “No Show” if the passenger cannot be located or contacted within (a) one (1) hour for airport pickups (time begins when passenger’s plane lands) or (b) thirty (30) minutes at other pickup locations. For all No-Shows, the full trip fare, including a twenty (20) percent gratuity, will be charged. ",
      },
    ],
  },
  {
    category: "entertainment",
    items: [
      {
        name: "Accept requests from guests",
        type: Boolean,
        hasComment: true,
      },
      {
        name: "Continuous band play time",
        type: Boolean,
        hasComment: true,
      },
      {
        name: "Max group size",
        type: Number,
        noSuffix: true,
      },
      {
        name: "Accessibility of activity",
        type: Boolean,
      },
      {
        name: "Age restrictions",
        type: Boolean,
        hasComment: true,
      },
      {
        name: "Time of day",
        type: "MultiSelection",
        options: ["Morning", "Afternoon", "Evening", "Night"],
        value: [],
      },
      {
        name: "Performer require a meal",
        type: Boolean,
      },
      {
        name: "Minimum Setup time required",
        subCategory: "charge",
        type: Number,
        value: 0,
        noSuffix: true,
        unit: "hour",
      },
      {
        name: "Number of breaks",
        type: Number,
        subCategory: "charge",
        value: 0,
        noSuffix: true,
      },
      // {
      //   name: "Additional requirements from venue",
      //   type: String,
      // },
      // {
      //   name: "Power supply needs",
      //   type: String,
      // },
      {
        name: "Flexible to different dress codes",
        type: Boolean,
        hasComment: true,
      },
      {
        name: "Meet before signing contract",
        type: Boolean,
        hasComment: true,
      },
      {
        name: "Arrival onsite before the event",
        type: "Including",
        value: true,
        cost: "0.00",
      },
      {
        name: "Handles Losgistics",
        type: Boolean,
        hasComment: true,
      },
    ],
  },
  {
    category: "administration",
    items: [],
  },
  {
    category: "securityservices",
    items: [
      {
        name: "Visit the venue in advance",
        type: Boolean,
      },
      {
        name: "Minimum hours of service",
        type: Number,
        noSuffix: true,
        unit: "hour",
      },
      {
        name: "Max hours per shift",
        type: Number,
        noSuffix: true,
        unit: "hour",
      },
      {
        name: "Dress code",
        type: Boolean,
        hasComment: true,
      },
    ],
  },
  {
    category: "technologyservices",
    items: [],
  },
  {
    category: "videographyandphotography",
    items: [
      {
        name: "Flexible to last minute onsite changes",
        type: Boolean,
      },
      {
        name: "Minimum amount of hours",
        type: Number,
        noSuffix: true,
        unit: "hour",
      },
      {
        name: "Need to control room lighting",
        type: Boolean,
      },
      {
        name: "Minimum internet bandwidth (Simulticasting, Streaming)",
        type: String,
      },
      {
        name: "Flexibility to operate with additional Photo / Video companies during the event",
        type: Boolean,
      },
    ],
  },
];
export const VendorPricingPolicy = [
  {
    category: "venuerental",
    items: [
      {
        name: "Minimum amount of rental hours required",
        type: Number,
        noSuffix: true,
        labelForValue: "Number of hours",
        hasComment: true,
        unit: "hour",
        value: "",
        hideOnProposal: true
      },
      {
        name: "Hours included in rental",
        type: Number,
        noSuffix: true,
        labelForValue: "Number of hours",
        hasComment: true,
        unit: "hour",
        value: "",
        hideOnProposal: true
      },
      {
        name: "Setup hours included in rental",
        type: Number,
        labelForValue: "Number of hours",
        noSuffix: true,
        hasComment: true,
        unit: "hour",
        hideOnProposal: true
      },
      {
        name: "Minimum Spend",
        type: Number,
        hasComment: true,
        hideOnProposal: true
      },
      {
        name: "Cost Per Extra Guest (beyond agreed upon qty)",
        type: Number,
        hasComment: true,
        labelForValue: "Cost",
        isExtraService: true,
        extraService: {
          label: "Cost Per Extra Guest (beyond agreed upon qty)"
        }
      },
      {
        name: "Overtime Cost(Rental)",
        type: Number,
        units: ["Per hour", "All togeter"],
        hasComment: true,
        isExtraService: true,
        extraService: {
          label: "Overtime Cost(Rental)"
        }
      },
      {
        name: "Additional Set-up Hours",
        type: Number,
        units: ["Per hour", "All togeter"],
        hasComment: true,
        isExtraService: true,
        extraService: {
          label: "Additional Set-up Hours"
        }
      },
      {
        name: "Late Night Fee",
        type: Number,
        hasUnit: true,
        units: ["Per person", "All together"],
        isExtraService: true,
        extraService: {
          label: "Late Night Fee"
        }
      },
      {
        name: "Discount for large quantities",
        hideOnProposal: true,
        type: Number,
        isPercentage: true,
        hasComment: true,
        attendees: null,
        labelForValue: "How much",
      },
      {
        name: "Tax rate",
        type: Number,
        isPercentage: true,
        hideOnProposal: true,
      },
      {
        name: "Suggested Gratuity",
        type: Number,
        isPercentage: true,
        hideOnProposal: true,
      },
    ],
  },
  {
    category: "foodandbeverage",
    items: [
      {
        name: "Travel cost",
        type: Number,
        hasComment: true,
      },
      {
        name: "Pickup",
        type: Number,
        hasComment: true,
        isExtraService: true,
        extraService: {
          label: "Pickup"
        }

      },
      {
        name: "Cleanup",
        type: Number,
        hasComment: true,
        isExtraService: true,
        extraService: {
          label: "Cleanup"
        }
      },
      {
        name: "Late Night Fee",
        type: Number,
        hasComment: true,
        isExtraService: true,
        extraService: {
          label: "Late Night Fee"
        }
      },
      {
        name: "Breakdown",
        type: Number,
        hasComment: true,
        isExtraService: true,
        extraService: {
          label: "Breakdown"
        }
      },
      {
        name: "Discount for large quantities",
        type: Number,
        hideOnProposal: true,
        isPercentage: true,
        hasComment: true,
        attendees: null,
        labelForValue: "How much",
      },
      {
        name: "Tax rate",
        type: Number,
        isPercentage: true,
        hideOnProposal: true,
      },
      {
        name: "Suggested Gratuity",
        type: Number,
        hasComment: true,
        hideOnProposal: true,
      },
    ],
  },
  {
    category: "decor",
    items: [
      {
        name: "Delivery",
        type: Number,
        hasComment: true,
      },
      {
        name: "Setup",
        type: Number,
        hasComment: true,
      },
      {
        name: "Discount for large quantities",
        type: "DiscountForLarge",
        labelForAttendees: "How many",
        labelForValue: "Rate",
        isSelected: false,
        value: 0,
        attendees: null,
        hasComment: true,
        hideOnProposal: true,
        unit: "%"
      },
      {
        name: "Tax rate",
        type: Number,
        isPercentage: true,
        hideOnProposal: true,
      },
      {
        name: "Suggested Gratuity",
        type: Number,
        hasComment: true,
        isPercentage: true,
        hideOnProposal: true,
      },
      {
        name: "Service charges",
        type: Number,
        hasComment: true,
        hideOnProposal: true,
      },
    ],
  },
  {
    category: "corporatesocialresponsibility",
    items: [
      {
        name: "Travel distance to event",
        type: Number,
        hasComment: true,
      },
      {
        name: "Special attire requests",
        type: Number,
        hasComment: true,
      },
      {
        name: "Last minute requests",
        type: Number,
        hasComment: true,
      },
      {
        name: "Discount for large quantities",
        type: Number,
        hideOnProposal: true,
        isPercentage: true,
        hasComment: true,
        attendees: null,
        labelForValue: "How much",
      },
      {
        name: "Tax rate",
        type: Number,
        isPercentage: true,
        hideOnProposal: true,
      },
      {
        name: "Suggested Gratuity",
        type: Number,
        hasComment: true,
        hideOnProposal: true,
      },
    ],
  },
  {
    category: "signageprinting",
    items: [
      {
        name: "Minimum package budget",
        type: Number,
        hasComment: true,
      },
      {
        name: "Rush order",
        type: Number,
        hasComment: true,
      },
      {
        name: "Discount for large quantities",
        type: Number,
        hideOnProposal: true,
        isPercentage: true,
        hasComment: true,
        attendees: null,
        labelForValue: "How much",
      },
      {
        name: "Tax rate",
        type: Number,
        isPercentage: true,
        hideOnProposal: true,
      },
      {
        name: "Suggested Gratuity",
        type: Number,
        hasComment: true,
        hideOnProposal: true,
      },
    ],
  },
  {
    category: "advertising-promotion",
    items: [],
  },
  {
    category: "equipmentrentals",
    items: [
      {
        name: "Tent permit",
        type: Number,
        hasComment: true,
      },
      {
        name: "Extra setup and breakdown charge",
        type: Number,
        hasComment: true,
      },
      {
        name: "Late charge for returned items",
        type: Number,
        hasComment: true,
      },
      {
        name: "Damage to equipment",
        type: Number,
        hasComment: true,
      },
      {
        name: "Large quantity discount",
        type: Number,
        isPercentage: true,
        hasComment: true,
        attendees: null,
      },
      {
        name: "Off-season discount",
        type: Boolean,
        label: "Discount rate",
        discount: null,
        hasUnit: true,
        units: ["%", "$"],
      },
      {
        name: "Quantity discount",
        type: Boolean,
        label: "Discount rage",
        discount: null,
        hasUnit: true,
        units: ["%", "$"],
      },
      {
        name: "Tax rate",
        type: Number,
        isPercentage: true,
        hideOnProposal: true,
      },
      {
        name: "Large group discounts",
        type: "GroupDiscount",
        labelForGroupSize: "How many",
        labelForValue: "Discount",
        isSelected: false,
        value: 0,
        groupSize: null,
        hideOnProposal: true,
        isPercentage: true,
        unit: "%"
      },
      {
        name: "Suggested Gratuity",
        type: Number,
        hasComment: true,
        hideOnProposal: true,
      },
    ],
  },
  {
    category: "audiovisualstagingservices",
    items: [
      {
        name: "Rush job",
        type: Number,
        hasComment: true,
      },
      {
        name: "Overtime",
        type: Number,
        hasComment: true,
      },
      {
        name: "Tax rate",
        type: Number,
        isPercentage: true,
        hideOnProposal: true,
      },
      {
        name: "Discounts",
        type: Number,
        isPercentage: true,
        hasComment: true,
        hideOnProposal: true,
      },
      {
        name: "Suggested Gratuity",
        type: Number,
        hasComment: true,
        isPercentage: true,
        hideOnProposal: true,
      },
    ],
  },
  {
    category: "giveaways",
    items: [
      {
        name: "Rushed orders",
        type: Number,
        hasComment: true,
      },
      {
        name: "Delivery",
        type: Number,
        hasComment: true,
      },
      {
        name: "preparing file for printing",
        type: Number,
        hasComment: true,
      },
      {
        name: "Multiple print locations",
        type: Number,
        hasComment: true,
      },
      {
        name: "Number of different colors",
        type: Number,
        hasComment: true,
      },
      {
        name: "Tax rate",
        type: Number,
        isPercentage: true,
        hideOnProposal: true,
      },
      {
        name: "Discount for large quantites",
        type: Number,
        hideOnProposal: true,
        hasComment: true,
        labelForValue: "How much",
      },
      {
        name: "Suggested Gratuity",
        type: Number,
        hasComment: true,
        hideOnProposal: true,
      },
    ],
  },
  {
    category: "shipping",
    items: [],
  },
  {
    category: "transportation",
    items: [
      {
        name: "Tax rate",
        type: Number,
        isPercentage: true,
        hideOnProposal: true,
      },
      {
        name: "Large group discounts",
        type: "GroupDiscount",
        labelForGroupSize: "How many",
        labelForValue: "Discount",
        isSelected: false,
        value: 0,
        groupSize: null,
        hideOnProposal: true,
        isPercentage: true,
        unit: "%"
      },
      {
        name: "Road tolls",
        hasComment: true,
        placeholder: "TBD fee to be charged for all tolls that cars pass through.",
      },
      {
        name: "Packing fees",
        hasComment: true,
        placeholder: "TBD fee to be charged for all parking that a car incurs.",
      },
      {
        name: "Service fee",
        hasComment: true,
      },
      {
        name: "Administration fee",
        cost: null,
        hasComment: true,
      },
      {
        name: "Additional Stops",
        cost: null,
        hasComment: true,
      },
      {
        name: "Meet & Greet fee",
        cost: null,
        hasComment: true,
      },
      {
        name: "Suggested Gratuity",
        type: Number,
        hasComment: true,
        hideOnProposal: true,
      },
    ],
  },
  {
    category: "entertainment",
    items: [
      {
        name: "Hours included in service",
        subCategory: "charge",
        type: Number,
        hasComment: true,
        labelForValue: "Number of hours",
        noSuffix: true,
        unit: "hour",
        hideOnProposal: true,
      },
      {
        name: "Rushed setup",
        subCategory: "charge",
        type: Number,
        hasComment: true,
        isExtraService: true,
        extraService: {
          label: "Rushed setup"
        }
      },
      {
        name: "Rehearsal time for the band (for special requests)",
        subCategory: "charge",
        type: "CostAndQty",
        hasComment: true,
        isExtraService: true,
        value: "",
        defaultQty: "",
        labelForDefaultQty: "Minimum hours",
        labelForValue: "Price per hour",
        extraService: {
          label: "Rehearsal time for the band (for special requests)"
        },
        qtyUnit: "hour"
      },
      // {
      //   name: "Special operating time",
      //   subCategory: "charge",
      //   type: "MultiSelection",
      //   options: ["Morning", "Afternoon", "Evening", "Night"],
      //   value: [],
      // },
      {
        name: "Extra for prizes",
        subCategory: "charge",
        type: Number,
        hasComment: true,
        isExtraService: true,
        extraService: {
          label: "Extra for prizes"
        }
      },
      {
        name: "Overtime charges",
        subCategory: "charge",
        type: "Cost",
        value: "",
        unit: "$",
        qtyUnit: "hour"

      },
      {
        name: "Tax rate",
        subCategory: "tax",
        type: Number,
        hideOnProposal: true,
        isPercentage: true,
      },
      {
        name: "Large group discounts",
        type: "GroupDiscount",
        labelForGroupSize: "How many",
        labelForValue: "Discount",
        isSelected: false,
        value: 0,
        groupSize: null,
        hideOnProposal: true,
        isPercentage: true,
        unit: "%"
      },
      {
        name: "Suggested Gratuity",
        type: Number,
        isPercentage: true,
        hideOnProposal: true,
      },
    ],
  },
  {
    category: "administration",
    items: [],
  },
  {
    category: "securityservices",
    items: [
      {
        name: "Pre-selection personal",
        type: Number,
        hasComment: true,
      },
      {
        name: "Number of hours",
        type: Number,
        hasComment: true,
        unit: "hour",
      },
      {
        name: "Level of security training/certification",
        type: Number,
        hasComment: true,
      },
      {
        name: "Special attire requests",
        type: Number,
        hasComment: true,
      },
      {
        name: "Tax rate",
        type: Number,
        isPercentage: true,
        hideOnProposal: true,
      },

      {
        name: "Large group discounts",
        type: "GroupDiscount",
        labelForGroupSize: "How many",
        labelForValue: "Discount",
        isSelected: false,
        value: 0,
        groupSize: null,
        hideOnProposal: true,
        isPercentage: true,
        unit: "%"
      },
      {
        name: "Suggested Gratuity",
        type: Number,
        hasComment: true,
        hideOnProposal: true,
      },
    ],
  },
  {
    category: "technologyservices",
    items: [],
  },
  {
    category: "videographyandphotography",
    items: [
      {
        name: "Overtime charge",
        subCategory: "charge",
        type: "Cost",
        value: "",
        unit: "$",
        qtyUnit: "hour"
      },
      {
        name: "Travel to multiple locations",
        type: Number,
        hasComment: true,
        value: ""
      },
      {
        name: "Additional Pictures (more than in package purchased)",
        type: Number,
        hasComment: true,
        value: ""
      },
      {
        name: "Discount for large quantity",
        type: Boolean,
        attendees: null,
        hideOnProposal: true,
        labelForValue: "How much",
        value: ""
      },
      {
        name: "Tax rate",
        type: Number,
        isPercentage: true,
        hideOnProposal: true,
        value: ""
      },
      {
        name: "Suggested Gratuity",
        type: Number,
        hasComment: true,
        hideOnProposal: true,
        isPercentage: true,
        value: ""
      },
    ],
  },
];
export const categoryNameWithIcons = [
  {
    name: "Venue Rental",
    value: "venuerental",
    icon: "venuerental.svg",
  },
  {
    name: "Food & Beverage",
    value: "foodandbeverage",
    icon: "foodandbeverage.svg",
  },
  {
    name: "Design and Decor",
    value: "decor",
    icon: "decor.svg",
  },
  {
    name: "Guest Services & Staffing",
    value: "corporatesocialresponsibility",
    icon: "corporatesocialresponsibility.svg",
  },
  {
    name: "Signage / Printing",
    value: "signageprinting",
    icon: "signageprinting.svg",
  },
  // {
  //   name: 'Advertising and Promotion',
  //   value: 'advertising-promotion',
  //   icon: 'advertising-promotion.svg'
  // },
  {
    name: "AV / Staging",
    value: "audiovisualstagingservices",
    icon: "audiovisualstagingservices.svg",
  },
  {
    name: "giveaways",
    value: "giveaways",
    icon: "swags.svg",
  },
  // {
  //   name: 'Shipping',
  //   value: 'shipping',
  //   icon: 'shipping.svg'
  // },
  {
    name: "Transportation & Tour operator",
    value: "transportation",
    icon: "transportation.svg",
  },
  {
    name: "Entertainment",
    value: "entertainment",
    icon: "entertainment.svg",
  },
  // {
  //   name: 'Administration',
  //   value: 'administration',
  //   icon: 'administration.svg'
  // },
  {
    name: "Security",
    value: "securityservices",
    icon: "securityservices.svg",
  },
  // {
  //   name: 'Technology',
  //   value: 'technologyservices',
  //   icon: 'technologyservices.svg'
  // },
  {
    name: "Videography and Photography",
    value: "videographyandphotography",
    icon: "videographyandphotography.svg",
  },
  {
    name: "Equipment Rentals",
    value: "equipmentrentals",
    icon: "equipmentrentals.svg",
  },
];
export const cancellationPolicyData = [
  {
    notice: "the client cancel on the day of the Event",
    vendorPayout: "the client will pay in full",
    cancellationFee: "full Payment-no refund will be given",
  },
  {
    notice: "the client cancel less than a week prior of the Event but not on the day of the Event",
    vendorPayout: "the client will pay 80% ",
    cancellationFee: "full Payment-no refund will be given",
  },
  {
    notice: "the client cancel less than two weeks prior of the Event bu more than one week prior to the Event",
    vendorPayout: "the client willl pay 60%",
    cancellationFee: "80% Payment(20% refunded to Planner)",
  },
  {
    notice: "the client cancel more than two weeks prior to the Event",
    vendorPayout: "the client will pay 15% equivalent to down payment",
    cancellationFee: "Down payment will not be refunded",
  },
];
export const socialMediaBlocks = [
  {
    name: "website",
    icon: "Asset 539.svg",
  },
  {
    name: "facebook",
    icon: "Asset 540.svg",
  },
  {
    name: "instagram",
    icon: "Group 4569 (2).svg",
  },
  {
    name: "youtube",
    icon: "socialmedia/Youtube.svg",
  },
  {
    name: "linkedin",
    icon: "socialmedia/Linkdin.svg",
  },
  {
    name: "google",
    icon: "socialmedia/GooglePlus.svg",
  },
  {
    name: "pinterest",
    icon: "socialmedia/Pinterest.svg",
  },
  {
    name: "foursquare",
    icon: "socialmedia/foursquare.svg",
  },
  {
    name: "reddit",
    icon: "socialmedia/Twitter.svg",
  },
  {
    name: "tiktok",
    icon: "socialmedia/Tiktok.svg",
  },
]
