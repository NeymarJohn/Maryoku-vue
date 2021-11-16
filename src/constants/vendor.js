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
    value: "administration",
    icon: `https://static-maryoku.s3.amazonaws.com/storage/icons/Budget Elements/administration.svg`,
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
          //       type: 'Boolean',
          //       value: false,
          //       xIncluded: true,
          //     },
          //     {
          //       name: 'shopping centers',
          //       type: 'Boolean',
          //       value: false,
          //       xIncluded: true,
          //     },
          //     {
          //       name: 'dining options within walking distance',
          //       type: 'Boolean',
          //       value: false,
          //       xIncluded: true,
          //     },
          //   ]
          // },
          {
            name: "the space",
            items: [
              {
                name: "Number of function spaces",
                type: 'Number',
                value: 1,
                xIncluded: true,
                hideOnAutoComplete: true
              },
              {
                name: "Number of meeting rooms",
                type: 'Number',
                value: 1,
                xIncluded: true,
                hideOnAutoComplete: true
              },
              // {
              //   name: 'indoor event space',
              //   type: 'Boolean',
              //   value: false,
              //   xIncluded: true,
              // },
              // {
              //   name: 'outdoor event space',
              //   type: 'Boolean',
              //   value: false,
              //   xIncluded: true,
              // },
              {
                name: "Raw Event space",
                type: 'Boolean',
                value: false,
                xIncluded: true,
                hideOnAutoComplete: true
              },
              {
                name: "Furnished Event space",
                type: 'Boolean',
                value: false,
                xIncluded: true,
                hideOnAutoComplete: true
              },
              {
                name: "smoking section",
                type: 'Boolean',
                value: false,
                xIncluded: true,
                hideOnAutoComplete: true
              },
              {
                name: "separate cocktail hour space",
                type: 'Boolean',
                value: true,
                xIncluded: false,
                hideOnAutoComplete: true
              },
              {
                name: "outside area for guests",
                type: 'Boolean',
                value: true,
                xIncluded: false,
                hideOnAutoComplete: true
              },
              // {
              //   name: 'kitchen for outside caterers',
              //   type: 'Boolean',
              //   value: true,
              //   xIncluded: false,
              // },
              {
                name: "available bathrooms",
                type: 'Number',
                value: 1,
                xIncluded: true,
                hideOnAutoComplete: true
              },
              {
                name: "coat check",
                type: 'Boolean',
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
                type: 'Boolean',
                value: false,
                xIncluded: false,
              },
              {
                name: "on street parking",
                type: 'Boolean',
                value: false,
                xIncluded: true,
                hideOnAutoComplete: true
              },
            ],
          },
          // {
          //   name: 'lighting',
          //   items: [
          //     {
          //       name: 'artificial lighting',
          //       type: 'Boolean',
          //       value: false,
          //       xIncluded: true,
          //     },
          //     {
          //       name: 'natural lighting space',
          //       type: 'Boolean',
          //       value: false,
          //       xIncluded: true,
          //     },
          //     // {
          //     //   name: 'control of lighting during event',
          //     //   type: 'Boolean',
          //     //   value: false,
          //     //   xIncluded: true,
          //     // },
          //     {
          //       name: "light effects",
          //       type: 'Boolean',
          //       value: false,
          //       xIncluded: false,
          //       comment: true,
          //     }
          //   ]
          // },
          {
            name: "network",
            items: [
              {
                name: 'fast reliable Wifi for guests',
                type: 'Boolean',
                value: false
              },
              {
                name: "venue bandwidth",
                type: 'Boolean',
                value: false,
                hideOnAutoComplete: true
              },
            ],
          },
          {
            name: "entertainment",
            items: [
              {
                name: "stage",
                type: 'Boolean',
                value: false,
                hideOnAutoComplete: true
              },
              {
                name: "dance floor",
                type: 'Boolean',
                value: false,
                hideOnAutoComplete: true
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
                type: 'Boolean',
                value: false,
              },
            ],
          },
          {
            name: "cleaning",
            items: [
              {
                name: "cleaning services during the event",
                type: 'Boolean',
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
                type: 'Boolean',
                value: false,
                xIncluded: true,
              },
              {
                name: "accessible bathrooms",
                type: 'Number',
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
                type: 'Boolean',
                value: false,
              },
              {
                name: "outdoor chairs",
                type: 'Boolean',
                value: false,
              },
              {
                name: "high chairs",
                type: 'Boolean',
                value: false,
              },
              {
                name: "tables",
                type: 'Boolean',
                value: false,
              },
              {
                name: "outdoor tables",
                type: 'Boolean',
                value: false,
              },
              {
                name: "high tables",
                type: 'Boolean',
                value: false,
              },
            ],
          },
          {
            name: "power",
            items: [
              {
                name: "power supply",
                type: 'Boolean',
                value: false,
                hideOnAutoComplete: true
              },
              {
                name: "generator",
                type: 'Boolean',
                value: false,
                hideOnAutoComplete: true
              },
            ],
          },
          {
            name: "AV",
            items: [
              {
                name: "microphones",
                type: 'Boolean',
                value: false,
                dry: null,
              },
              {
                name: "projector",
                type: 'Boolean',
                value: false,
                dry: null,
              },
              {
                name: "sound system",
                type: 'Boolean',
                value: false,
                dry: null,
                hideOnAutoComplete: true
              },
              {
                name: "LCD displays",
                type: 'Boolean',
                value: false,
                dry: null,
              },
              {
                name: "monitor",
                type: 'Boolean',
                value: false,
                dry: null,
              },
              {
                name: "Built in Screen",
                type: 'Boolean',
                value: false,
                dry: null,
              },
              {
                name: "Clickers",
                type: 'Boolean',
                value: false,
                dry: null,
              },
              {
                name: "Teleprompter",
                type: 'Boolean',
                value: false,
                dry: null,
              },
              {
                name: "Riser",
                type: 'Boolean',
                value: false,
                dry: null,
              },
              {
                name: "Switcher",
                type: 'Boolean',
                value: false,
                dry: null,
              },
              // {
              //   name: 'speaker / sound system',
              //   type: 'Boolean',
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
                type: 'Boolean',
                value: false,
                staff: null,
                quest: null,
              },
              // {
              //   name: 'cleaning staff',
              //   type: 'Boolean',
              //   value: false,
              //   staff: null,
              //   quest: null,
              // },
              // {
              //   name: "Catering and Waite Staff",
              //   type: 'Boolean',
              //   value: false,
              //   staff: null,
              //   quest: null,
              // },
              {
                name: "security",
                type: 'Boolean',
                value: false,
                staff: null,
                quest: null,
              },
              // {
              //   name: 'receptionist',
              //   type: 'Boolean',
              //   value: false,
              //   staff: null,
              //   quest: null,
              // },
              {
                name: "technical support",
                type: 'Boolean',
                value: false,
                staff: null,
                quest: null,
              },
              // {
              //   name: 'bathroom attendant',
              //   type: 'Boolean',
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
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: 'Boolean',
                value: false,
                xIncluded: true,
              },
              {
                name: "Non toxic products",
                type: 'Boolean',
                value: false,
                xIncluded: true,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [
              {
                name: "Strict sexual harrasment policy",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Diversity",
            items: [
              {
                name: "Prioritizing diversity and inclusion",
                type: 'Boolean',
                value: false,
                xIncluded: true,
              },
              {
                name: "Women on senior staff",
                type: 'Boolean',
                value: false,
                xIncluded: true,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: 'Boolean',
                value: false,
                xIncluded: true,
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
                  "american",
                  "Colombian",
                  "chinese",
                  "japanese",
                  "mexican",
                  "indian",
                  "Peruvian",
                  "Argentine",
                  "Thai",
                  "Cuban",
                  "Greek",
                ],
                hideOnAutoComplete: true
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
                hideOnAutoComplete: true
              },
              {
                name: "caterer type",
                type: Array,
                value: [],
                available: ["full service", "drop-off service"],
                hideOnAutoComplete: true
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
                type: 'Boolean',
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
                type: 'Boolean',
                value: false,
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
                type: 'Boolean',
                value: false,
                available: ["appetizers", "passed hours d'oeuvres", "stations", "buffet", "plated"],
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
                hideOnAutoComplete: true
              },
              {
                name: "lunch",
                type: 'Boolean',
                value: false,
                xIncluded: true,
                hideOnAutoComplete: true
              },
              {
                name: "dinner",
                type: 'Boolean',
                value: false,
                xIncluded: true,
                hideOnAutoComplete: true
              },
              {
                name: "snacks",
                type: 'Boolean',
                value: false,
                xIncluded: true,
              },
              {
                name: "desserts",
                type: 'Boolean',
                value: false,
                xIncluded: true,
                hideOnAutoComplete: true
              },
            ],
          },
          {
            name: "other",
            items: [
              {
                name: "table setup and preparations",
                type: 'Boolean',
                value: false,
              },
              {
                name: "interactive stations",
                type: 'Boolean',
                value: false,
              },
              {
                name: "set up centerpieces, name cards, favors, etc",
                type: 'Boolean',
                value: false,
              },
            ],
          },
          {
            name: "cleaning",
            items: [
              {
                name: "breakdown, cleaning and pickup",
                type: 'Boolean',
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
                type: 'Boolean',
                value: false,
              },
              {
                name: "tables",
                type: 'Boolean',
                value: false,
              },
            ],
          },
          {
            name: "tableware",
            items: [
              {
                name: "linens & tablecloth",
                type: 'Boolean',
                value: false,
              },
              {
                name: "glassware",
                type: 'Boolean',
                value: false,
              },
              {
                name: "Utensils",
                type: 'Boolean',
                value: false,
              },
              {
                name: "disposables",
                type: 'Boolean',
                value: false,
              },
              {
                name: "Plateware",
                type: 'Boolean',
                value: false,
              },
              {
                name: "customized items",
                type: 'Boolean',
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
                type: 'Boolean',
                value: false,
                staff: null,
                quest: null,
                hideOnAutoComplete: true
              },
              {
                name: "maltre d",
                type: 'Boolean',
                value: false,
                staff: null,
                quest: null,
                hideOnAutoComplete: true
              },
            ],
          },
          {
            name: "chefs and cooks",
            items: [
              {
                name: "chef",
                type: 'Boolean',
                value: false,
                // hideOnAutoComplete: true
              },
              {
                name: "specialty chef",
                type: 'Boolean',
                value: false,
              },
            ],
          },
          {
            name: "other",
            items: [
              {
                name: "servers",
                type: 'Boolean',
                value: false,
              },
              {
                name: "busboys",
                type: 'Boolean',
                value: false,
              },
              {
                name: "cleanup crew",
                type: 'Boolean',
                value: false,
                hideOnAutoComplete: true
              },
            ],
          },
          {
            name: "waitstaff",
            items: [
              {
                name: "waitstaff",
                type: 'Boolean',
                value: false,
              },
              // {
              //   name: "Number of waitstaff",
              //   hasComment: true,
              //   type: 'Number',
              //   value: 0,
              //   xIncluded: true,
              //   hideOnAutoComplete: true
              // },
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
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Non toxic products",
                type: 'Boolean',
                value: false,
                xIncluded: true,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [
              {
                name: "vegetarian",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "vegan",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "gluten - free",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "egg free",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "kosher",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "halal",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Diversity",
            items: [
              {
                name: "Prioritizing diversity and inclusion",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: 'Boolean',
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
                type: 'Boolean',
                value: false,
                hideOnAutoComplete: true
              },
              {
                name: "onsite setup",
                type: 'Boolean',
                value: false,
              },
              {
                name: "cleanup",
                type: 'Boolean',
                value: false,
              },
              {
                name: "Installation & Removal of Old items",
                type: 'Boolean',
                value: false,
              },
            ],
          },
          {
            name: "specialties",
            items: [
              {
                name: "digital decor",
                type: 'Boolean',
                value: false,
              },
              {
                name: "holiday decor",
                type: 'Boolean',
                value: false,
              },
              {
                name: "decor in motion",
                type: 'Boolean',
                value: false,
              },
              {
                name: "live decor",
                type: 'Boolean',
                value: false,
              },
              {
                name: "lighting decor",
                type: 'Boolean',
                value: false,
              },
              {
                name: "specialized theme designs",
                type: 'Boolean',
                value: false,
              },
              {
                name: "flower decor",
                type: 'Boolean',
                value: false,
              },
              {
                name: "designs serivces",
                type: 'Boolean',
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
                type: 'Boolean',
                value: false,
              },
              {
                name: "Extra flowers for caterer (boufet decor)",
                type: 'Boolean',
                value: false,
              },
              {
                name: "Refrigerated Truck",
                type: 'Boolean',
                value: false,
              },
              {
                name: "Permanent botanical arrangements",
                type: 'Boolean',
                value: false,
              },
            ],
          },
          {
            name: "other",
            items: [
              {
                name: "special effects (pyrotechnic, waterfall, baloon, explosion, etc)",
                type: 'Boolean',
                value: false,
              },
              {
                name: "props",
                type: 'Boolean',
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
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Non toxic products",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [
              {
                name: "hypoallergenic flowers",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "non scented flowers",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Diversity",
            items: [
              {
                name: "Prioritizing diversity and inclusion",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: 'Boolean',
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
    name: "administration",
    categories: [
      {
        name: "services",
        subCategories: [
          {
            name: "staffing",
            items: [
              {
                name: "event staffing",
                type: 'Boolean',
                value: false,
              },
              {
                name: "transportation host",
                type: 'Boolean',
                value: false,
              },
              {
                name: "models",
                type: 'Boolean',
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
                type: 'Boolean',
                value: false,
              },
              {
                name: "Food Server",
                type: 'Boolean',
                value: false,
              },
              {
                name: "Administrative Duties",
                type: 'Boolean',
                value: false,
              },
              {
                name: "Accounting",
                type: 'Boolean',
                value: false,
              },
            ],
          },
          {
            name: "guest services",
            items: [
              {
                name: "general guest services",
                type: 'Boolean',
                value: false,
              },
              {
                name: "consierge services",
                type: 'Boolean',
                value: false,
              },
              {
                name: "VIP services",
                type: 'Boolean',
                value: false,
              },
              {
                name: "day-of coordination",
                type: 'Boolean',
                value: false,
              },
              {
                name: "hosting",
                type: 'Boolean',
                value: false,
              },
              {
                name: "tours & sightseeing",
                type: 'Boolean',
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
                type: 'Boolean',
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
                type: 'Boolean',
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
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Non toxic products",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [
            ],
          },
          {
            name: "Diversity",
            items: [
              {
                name: "Prioritizing diversity and inclusion",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: 'Boolean',
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
                type: 'Boolean',
                value: false,
                hideOnAutoComplete: true
              },
              {
                name: "studio",
                type: 'Boolean',
                value: false,
                hideOnAutoComplete: true
              },
              {
                name: "traditional",
                type: 'Boolean',
                value: false,
                hideOnAutoComplete: true
              },
              {
                name: "candid",
                type: 'Boolean',
                value: false,
                hideOnAutoComplete: true
              },
            ],
          },
          {
            name: "editing",
            items: [
              {
                name: "video",
                type: 'Boolean',
                value: false,
              },
              // {
              //   name: "audio",
              //   type: 'Boolean',
              //   value: false,
              // },
              {
                name: "photo",
                type: 'Boolean',
                value: false,
              },
              {
                name: "photo invitations / thank you",
                type: 'Boolean',
                value: false,
              },
            ],
          },
          {
            name: "format of delivery",
            items: [
              {
                name: "physical proof/print",
                type: 'Boolean',
                value: false,
              },
              {
                name: "flash drive",
                type: 'Boolean',
                value: false,
              },
              {
                name: "digital download",
                type: 'Boolean',
                value: false,
              },
            ],
          },
          {
            name: "setup & breakdown",
            items: [
              {
                name: "adapt equipment mobility to program",
                type: 'Number',
                value: 0,
                hideOnAutoComplete: true
              },
              {
                name: "setup & breakdown",
                type: 'Boolean',
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
                type: 'Boolean',
                value: false,
                hideOnAutoComplete: true
              },
              // {
              //   name: "simulacasting/live streaming",
              //   type: 'Boolean',
              //   value: false,
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
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Non toxic products",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [],
          },
          {
            name: "Diversity",
            items: [
              {
                name: "Prioritizing diversity and inclusion",
                type: 'Boolean',
                value: false,
                xIncluded: true,
              },
              {
                name: "Women on senior staff",
                type: 'Boolean',
                value: false,
                xIncluded: true,
              },
              {
                name: "Strict sexual harrasment policy",
                type: 'Boolean',
                value: false,
                xIncluded: true,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: 'Boolean',
                value: false,
                xIncluded: true,
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
              // {
              //   name: "speech writing",
              //   type: 'Boolean',
              //   value: false,
              // },
              // {
              //   name: "press releases",
              //   type: 'Boolean',
              //   value: false,
              // },
              // {
              //   name: "high profile sourcing",
              //   type: Array,
              //   value: [],
              //   available: ["politicians", "celebrities", "influencers", "artists"],
              // },
              // {
              //   name: "social media promotion",
              //   type: 'Boolean',
              //   value: false,
              // },
              {
                name: "media pitch",
                type: 'Boolean',
                value: false,
              },
            ],
          },
          {
            name: "marketing",
            items: [
              {
                name: "branding strategy",
                type: 'Boolean',
                value: false,
              },
              {
                name: "consultation",
                type: 'Boolean',
                value: false,
              },
              {
                name: "Website Development",
                type: 'Boolean',
                value: false,
              },
              {
                name: "Digital Newsletter",
                type: 'Boolean',
                value: false,
              },
              {
                name: "e-Marketing Strategies",
                type: 'Boolean',
                value: false,
              },
              {
                name: "Catalog (Digital & Print)",
                type: 'Boolean',
                value: false,
              },
            ],
          },
          {
            name: "print services",
            items: [
              {
                name: "Invitations",
                type: 'Boolean',
                value: false,
              },
              {
                name: "Menus",
                type: 'Boolean',
                value: false,
              },
              {
                name: "Place cards",
                type: 'Boolean',
                value: false,
              },
              {
                name: "Tent cards",
                type: 'Boolean',
                value: false,
              },
              {
                name: "Post Cards",
                type: 'Boolean',
                value: false,
              },
              {
                name: "Business Cards",
                type: 'Boolean',
                value: false,
              },
              {
                name: "Large Print Items (Blueprints, CAD Drawings)",
                type: 'Boolean',
                value: false,
              },
              {
                name: "Binding & Laminating",
                type: 'Boolean',
                value: false,
              },
            ],
          },
          {
            name: "Signage",
            items: [
              {
                name: "Posters",
                type: 'Boolean',
                value: false,
              },
              {
                name: "Banners",
                type: 'Boolean',
                value: false,
              },
              {
                name: "Presentation Boards",
                type: 'Boolean',
                value: false,
              },
              {
                name: "Window Graphics",
                type: 'Boolean',
                value: false,
              },
              {
                name: "Outdoor Signage",
                type: 'Boolean',
                value: false,
              },
            ],
          },
          {
            name: "graphics",
            items: [
              {
                name: "graphic design services",
                type: 'Boolean',
                value: false,
              },
            ],
          },
          {
            name: "administrative",
            items: [
              {
                name: "guest lists",
                type: 'Boolean',
                value: false,
              },
              {
                name: "translation",
                type: 'Boolean',
                value: false,
              },
              // {
              //   name: "transcription",
              //   type: 'Boolean',
              //   value: false,
              // },
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
                type: 'Boolean',
                value: false,
              },
              {
                name: "branded lighting effect",
                type: 'Boolean',
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
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Non toxic products",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [
            ],
          },
          {
            name: "Diversity",
            items: [
              {
                name: "Prioritizing diversity and inclusion",
                type: 'Boolean',
                value: false,
                xIncluded: true,
              },
              {
                name: "Women on senior staff",
                type: 'Boolean',
                value: false,
                xIncluded: true,
              },
              {
                name: "Strict sexual harrasment policy",
                type: 'Boolean',
                value: false,
                xIncluded: true,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: 'Boolean',
                value: false,
                xIncluded: true,
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
              // {
              //   name: "taxi",
              //   type: 'Boolean',
              //   value: false,
              // },
              {
                name: "airport pickup/drop off",
                type: 'Boolean',
                value: false,
              },
              {
                name: "round trip",
                type: 'Boolean',
                value: false,
              },
              {
                name: "one way",
                type: 'Boolean',
                value: false,
              },
              {
                name: "tours",
                type: 'Boolean',
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
                type: 'Boolean',
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "transportation coordinator",
                type: 'Boolean',
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "uniform style",
                type: 'Boolean',
                value: "",
                staff: null,
                quest: null,
              },
              // {
              //   name: "certified safe drive",
              //   type: 'Boolean',
              //   value: false,
              //   staff: null,
              //   quest: null,
              // },
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
                type: 'Boolean',
                value: false,
              },
              {
                name: "bar",
                type: 'Boolean',
                value: false,
              },
              {
                name: "luggage pickup",
                type: 'Boolean',
                value: false,
              },
              {
                name: "food",
                type: 'Boolean',
                value: false,
              },
              {
                name: "TV/Cable TV",
                type: 'Boolean',
                value: false,
              },
              {
                name: "restrooms",
                type: 'Boolean',
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
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Non toxic products",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [],
          },
          {
            name: "Diversity",
            items: [
              {
                name: "Prioritizing diversity and inclusion",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: 'Boolean',
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
                type: 'Boolean',
                value: false,
              },
              {
                name: "instrument",
                type: 'Boolean',
                value: false,
                hideOnAutoComplete: true
              },
              {
                name: "vocalist",
                type: 'Boolean',
                value: false,
                hideOnAutoComplete: true
              },
              {
                name: "motivators",
                type: 'Boolean',
                value: false,
              },
              {
                name: "specialty DJ(ethnic music)",
                type: 'Boolean',
                value: false,
              },
              {
                name: "Act as MC",
                type: 'Boolean',
                value: false,
              },
            ],
          },
          {
            name: "band",
            items: [
              {
                name: "one man instrument",
                type: 'Boolean',
                value: false,
              },
              {
                name: "trio",
                type: 'Boolean',
                value: false,
              },
              {
                name: "quartet",
                type: 'Boolean',
                value: false,
              },
              // {
              //   name: "vocalist",
              //   type: 'Boolean',
              //   value: false,
              // },
              {
                name: "orchestra",
                type: 'Boolean',
                value: false,
              },
              {
                name: "nine pieces and plus",
                type: 'Boolean',
                value: false,
              },
              {
                name: "specialty band (ethnic music, rock and roll etc)",
                type: 'Boolean',
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
                hideOnAutoComplete: true
              },
              {
                name: "singers",
                type: 'Boolean',
                value: false,
              },
              {
                name: "keynote speaker / special MC",
                type: 'Boolean',
                value: false,
              },
              {
                name: "theme entertainment ( dancers, shows, illusionist etc )",
                type: 'Boolean',
                value: false,
              },
            ],
          },
          {
            name: "activities",
            items: [
              {
                name: "team building",
                type: 'Boolean',
                value: false,
              },
              {
                name: "events and shows",
                type: 'Boolean',
                value: false,
              },
              {
                name: "museum & art gallery visits",
                type: 'Boolean',
                value: false,
              },
              {
                name: "classes",
                type: 'Boolean',
                value: false,
              },
              {
                name: "sport",
                type: 'Boolean',
                value: false,
              },
              {
                name: "family activities",
                type: 'Boolean',
                value: false,
              },
              {
                name: "children activities",
                type: 'Boolean',
                value: false,
              },
              {
                name: "food",
                type: 'Boolean',
                value: false,
                hideOnAutoComplete: true
              },
              {
                name: "wine/beer/bourbon/etc",
                type: 'Boolean',
                value: false,
                hideOnAutoComplete: true
              },
              {
                name: "sightseeing",
                type: 'Boolean',
                value: false,
              },
            ],
          },
          {
            name: "setup, guidance & cleanup",
            items: [
              {
                name: "onsite coordinatores, instructors, guides",
                type: 'Boolean',
                value: false,
              },
              {
                name: "setup/breakdown hours included",
                type: 'Boolean',
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
                type: 'Boolean',
                value: false,
              },
              {
                name: "stage light",
                type: 'Boolean',
                value: false,
              },
              {
                name: "dance floor",
                type: 'Boolean',
                value: false,
              },
              {
                name: "specialty lighting (pinpoint, strobe)",
                type: 'Boolean',
                value: false,
              },
              {
                name: "theatrical staging",
                type: 'Boolean',
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
                type: 'Boolean',
                value: false,
                hideOnAutoComplete: true
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
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Non toxic products",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [],
          },
          {
            name: "Diversity",
            items: [
              {
                name: "Prioritizing diversity and inclusion",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: 'Boolean',
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
                type: 'Boolean',
                value: false,
              },
              {
                name: "VIP security",
                type: 'Boolean',
                value: false,
              },
              {
                name: "executive protection",
                type: 'Boolean',
                value: false,
              },
              {
                name: "disaster security team",
                type: 'Boolean',
                value: false,
              },
              {
                name: "active shooter",
                type: 'Boolean',
                value: false,
              },
              {
                name: "training",
                type: 'Boolean',
                value: false,
              },
              {
                name: "firearms training",
                type: 'Boolean',
                value: false,
              },
              {
                name: "K9 detection services",
                type: 'Boolean',
                value: false,
              },
              {
                name: "licensed to carry fire arms",
                type: 'Boolean',
                value: false,
              },
              {
                name: "parameter security",
                type: 'Boolean',
                value: false,
              },
            ],
          },
          {
            name: "staff",
            items: [
              {
                name: "chaperones",
                type: 'Boolean',
                value: false,
                // xIncluded: true,
                staff: null,
                quest: null,
              },
              {
                name: "patrolling officers",
                type: 'Boolean',
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "bouncers",
                type: 'Boolean',
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "body guards",
                type: 'Boolean',
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "armed security officers",
                type: 'Boolean',
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "unarmed security",
                type: 'Boolean',
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "undercover",
                type: 'Boolean',
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "crowd control",
                type: 'Boolean',
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "certified security personnel ",
                type: 'Boolean',
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
                type: 'Boolean',
                value: 0,
                hideLabelForValue: true
              },
            ],
          },
        ],
      },
      {
        name: "Sustainability and Inclusion",
        subCategories: [
          {
            name: "Sustainability",
            items: [
              {
                name: "green policy applied",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Non toxic products",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [
              {
                name: "Prioritizing diversity and inclusion",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: 'Boolean',
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
                type: 'Boolean',
                value: false,
              },
              // {
              //   name: "production",
              //   type: 'Boolean',
              //   value: false,
              // },
              // {
              //   name: "Backdrop/Scenic & Decor",
              //   type: 'Boolean',
              //   value: false,
              // },
              {
                name: "rigging",
                type: 'Boolean',
                value: false,
              },
              // {
              //   name: "programmer",
              //   type: 'Boolean',
              //   value: false,
              // },
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
              // {
              //   name: "ZAP shots",
              //   type: 'Boolean',
              //   value: false,
              // },
              {
                name: "cranes",
                type: 'Boolean',
                value: false,
              },
            ],
          },
          {
            name: "Show Management",
            items: [
              // {
              //   name: "Event Services",
              //   type: 'Boolean',
              //   value: false,
              // },
              {
                name: "Outdoor Staging & Tents",
                type: 'Boolean',
                value: false,
              },
            ],
          },
          {
            name: "other",
            items: [
              {
                name: "special effects",
                type: 'Boolean',
                value: false,
              },
              {
                name: "special equipment",
                type: 'Boolean',
                value: false,
              },
              {
                name: "simulcasting",
                type: 'Boolean',
                value: false,
              },
              {
                name: "cordless mics",
                type: 'Boolean',
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
                type: 'Boolean',
                value: false,
                staff: null,
                quest: null,
              },
              {
                name: "setup crew",
                type: 'Boolean',
                value: false,
                staff: null,
                quest: null,
              },
              // {
              //   name: "programmer",
              //   type: 'Boolean',
              //   value: false,
              //   staff: null,
              //   quest: null,
              // },
              // {
              //   name: "event manager",
              //   type: 'Boolean',
              //   value: false,
              //   staff: null,
              //   quest: null,
              // },
              {
                name: "rigging",
                type: 'Boolean',
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
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Non toxic products",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [
            ],
          },
          {
            name: "Diversity",
            items: [
              {
                name: "Prioritizing diversity and inclusion",
                type: 'Boolean',
                value: false,
                xIncluded: true,
              },
              {
                name: "Women on senior staff",
                type: 'Boolean',
                value: false,
                xIncluded: true,
              },
              {
                name: "Strict sexual harrasment policy",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: 'Boolean',
                value: false,
                xIncluded: true,
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
                type: 'Boolean',
                value: false,
              },
              {
                name: "specialty food & liquor",
                type: 'Boolean',
                value: false,
              },
              {
                name: "tech items",
                type: 'Boolean',
                value: false,
              },
              {
                name: "apparel",
                type: 'Boolean',
                value: false,
              },
              {
                name: "drinkware",
                type: 'Boolean',
                value: false,
              },
              {
                name: "bags",
                type: 'Boolean',
                value: false,
              },
              {
                name: "wellness",
                type: 'Boolean',
                value: false,
              },
              {
                name: "fitness items",
                type: 'Boolean',
                value: false,
              },
              {
                name: "office items",
                type: 'Boolean',
                value: false,
              },
              {
                name: "travel items",
                type: 'Boolean',
                value: false,
              },
              {
                name: "outdoor & leisure items",
                type: 'Boolean',
                value: false,
              },
              {
                name: "stationary",
                type: 'Boolean',
                value: false,
              },
              {
                name: "safety",
                type: 'Boolean',
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
                name: "rushed orders",
                type: 'Boolean',
                value: false,
              },
              {
                name: "graphic design",
                type: 'Boolean',
                value: false,
              },
              {
                name: "special requests",
                type: 'Boolean',
                value: false,
              },
              {
                name: "printing",
                type: 'Boolean',
                value: false,
              },
              {
                name: "stuffing and packaging",
                type: 'Boolean',
                value: false,
              },
              {
                name: "customization",
                type: 'Boolean',
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
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Non toxic products",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [
              {
                name: "provide sample",
                type: 'Boolean',
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
                name: "Prioritizing diversity and inclusion",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: 'Boolean',
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
                type: 'Boolean',
                value: false,
              },
              {
                name: "special delivery and pickup",
                type: 'Boolean',
                value: false,
              },
              {
                name: "pre-inspection",
                type: 'Boolean',
                value: false,
              },
              {
                name: "set-up & tear-Down",
                type: 'Boolean',
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
                type: 'Boolean',
                value: false,
              },
              {
                name: "tables",
                type: 'Boolean',
                value: false,
              },
              {
                name: "tableware",
                type: 'Boolean',
                value: false,
              },
              {
                name: "special catering rental equipment",
                type: 'Boolean',
                value: false,
              },
              {
                name: "table coverings",
                type: 'Boolean',
                value: false,
              },
              {
                name: "furniture / props",
                type: 'Boolean',
                value: false,
              },
            ],
          },
          {
            name: "tech equipment",
            items: [
              // {
              //   name: "screens",
              //   type: 'Boolean',
              //   value: false,
              // },
              {
                name: "projections",
                type: 'Boolean',
                value: false,
              },
              // {
              //   name: "recordings",
              //   type: 'Boolean',
              //   value: false,
              // },
              // {
              //   name: "video conferencing",
              //   type: 'Boolean',
              //   value: false,
              // },
            ],
          },
          {
            name: "tents",
            items: [
              {
                name: "tents",
                type: 'Boolean',
                value: false,
              },
              {
                name: "air conditioning",
                type: 'Boolean',
                value: false,
              },
              {
                name: "generator",
                type: 'Boolean',
                value: false,
              },
              {
                name: "tent lighting",
                type: 'Boolean',
                value: false,
              },
              {
                name: "flooring and carpeting",
                type: 'Boolean',
                value: false,
              },
              {
                name: "portable bathrooms",
                type: 'Boolean',
                value: false,
              },
              {
                name: "liners",
                type: 'Boolean',
                value: false,
              },
            ],
          },
          {
            name: "other",
            items: [
              {
                name: "staging, podiums, registration areas",
                type: 'Boolean',
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
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Water saving protocols in place",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "We use Green power and energy efficient",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Waste recycle procedures",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Non toxic products",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
            ],
          },
          {
            name: "Inclusion",
            items: [],
          },
          {
            name: "Diversity",
            items: [
              {
                name: "Prioritizing diversity and inclusion",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Women on senior staff",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Strict sexual harrasment policy",
                type: 'Boolean',
                xIncluded: true,
                value: false,
              },
              {
                name: "Acknowledge all religious and cultural holidays",
                type: 'Boolean',
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
        type: 'Boolean',
        value: false,
      },
    ],
  },
  {
    name: "foodandbeverage",
    items: [
      {
        name: "seasonal menu update (at least twice anual)",
        type: 'Boolean',
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
        type: 'Number',
        value: 0,
      },
      {
        name: "perform at more than one vent per day?",
        type: 'Boolean',
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
      "gallery",
      "garden",
      "historic establishment",
      "bar or pub or club",
      "restaurant",
      "Meeting Room",
      "community center",
      "sport club",
      "academic venue",
      "stately home",
      "stadium",
    ],
  },
  {
    name: "foodandbeverage",
    type: Array,
    value: [],
    available: ["Food catering", "Beverage", "Pastry & Bakery"],
  },
  {
    name: "decor",
    type: Array,
    value: [],
    available: ["floral", "lighting", "interior design"],
  },
  {
    name: "administration",
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
      //   type: 'Boolean',
      // },

      {
        name: "Suitable for infants",
        type: 'Boolean',
        hasComment: true,
      },
      {
        name: "Audio restrictions",
        type: 'Boolean',
        hasComment: true,
      },
      {
        name: "Decor restrictions",
        type: 'Boolean',
        hasComment: true,
      },
      {
        name: "Dress code",
        type: 'Boolean',
        hasComment: true,
      },
      {
        name: "Dry Hire",
        type: 'Boolean',
        hasComment: true,
      },
      {
        name: "Pets",
        type: 'Boolean',
        hasComment: true,
      },
    ],
  },
  {
    category: "foodandbeverage",
    items: [
      {
        name: "Tastings prior to booking",
        type: 'Boolean',
        cost: null,
      },
      {
        name: "Allow customer provided liquor",
        type: 'Boolean',
      },
    ],
  },
  {
    category: "decor",
    items: [
      {
        name: "Room temperature constraints(for flowers)",
        type: 'Boolean',
      },
      {
        name: "Flexible time requirement for setup",
        type: 'Boolean',
      },
      {
        name: "Working with unions",
        type: 'Boolean',
      },
    ],
  },
  {
    category: "administration",
    items: [
      {
        name: "Minimum hour of service",
        type: 'Number',
        noSuffix: true,
        hasComment: true,
      },
      {
        name: "Max guest to staff ratio",
        type: 'Number',
        isPercentage: true,
      },
      {
        name: "Work with Unions",
        type: 'Boolean',
      },
    ],
  },
  {
    category: "signageprinting",
    items: [
      {
        name: "Must use in house graphics designer",
        type: 'Boolean',
        hasComment: true,
      },
      {
        name: "Number of PR drafts",
        type: 'Number',
        noSuffix: true,
        hasComment: true,
      },
      {
        name: "Customizable size of prints",
        type: 'Boolean',
        hasComment: true,
      },
      {
        name: "Minimum Number of prints",
        type: 'Number',
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
        type: 'Number',
        noSuffix: true,
        hasComment: true,
      },
      {
        name: "Minimum tent time needed for set up",
        type: 'Number',
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
        type: 'Boolean',
      },

      {
        name: "Union crew restrictions",
        type: 'Boolean',
        hasComment: true,
      },
    ],
  },
  {
    category: "giveaways",
    items: [
      {
        name: "Allow pickup",
        type: 'Boolean',
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
        type: 'Boolean',
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
        type: 'Boolean',
        hasComment: true,
      },
      {
        name: "Continuous band play time",
        type: 'Boolean',
        hasComment: true,
      },
      {
        name: "Max group size",
        type: 'Number',
        noSuffix: true,
      },
      {
        name: "Accessibility of activity",
        type: 'Boolean',
      },
      {
        name: "Age restrictions",
        type: 'Boolean',
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
        type: 'Boolean',
      },
      {
        name: "Minimum Setup time required",
        subCategory: "charge",
        type: 'Number',
        value: 0,
        noSuffix: true,
        unit: "hour",
      },
      {
        name: "Number of breaks",
        type: 'Number',
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
        type: 'Boolean',
        hasComment: true,
      },
      {
        name: "Meet before signing contract",
        type: 'Boolean',
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
        type: 'Boolean',
        hasComment: true,
      },
    ],
  },
  {
    category: "securityservices",
    items: [
      {
        name: "Visit the venue in advance",
        type: 'Boolean',
      },
      {
        name: "Minimum hours of service",
        type: 'Number',
        noSuffix: true,
        unit: "hour",
      },
      {
        name: "Max hours per shift",
        type: 'Number',
        noSuffix: true,
        unit: "hour",
      },
      {
        name: "Dress code",
        type: 'Boolean',
        hasComment: true,
      },
      {
        name: "Level of security training/certification",
        type: String,
        hasComment: true,
      },
      {
        name: "Special attire requests",
        type: 'Boolean',
        hasComment: true,
      },
      {
        name: "Pre-selection personal",
        type: 'Boolean',
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
        type: 'Boolean',
      },
      {
        name: "Minimum amount of hours",
        type: 'Number',
        noSuffix: true,
        unit: "hour",
      },
      {
        name: "Need to control room lighting",
        type: 'Boolean',
      },
      {
        name: "Minimum internet bandwidth (Simulticasting, Streaming)",
        type: String,
      },
      {
        name: "Flexibility to operate with additional Photo / Video companies during the event",
        type: 'Boolean',
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
        type: 'Number',
        noSuffix: true,
        labelForValue: "Number of hours",
        hasComment: true,
        unit: "hour",
        value: "",
        hideOnProposal: true
      },
      {
        name: "Hours included in rental",
        type: 'Number',
        noSuffix: true,
        labelForValue: "Number of hours",
        hasComment: true,
        unit: "hour",
        value: "",
        hideOnProposal: true
      },
      {
        name: "Setup hours included in rental",
        type: 'Number',
        labelForValue: "Number of hours",
        noSuffix: true,
        hasComment: true,
        unit: "hour",
        hideOnProposal: true
      },
      {
        name: "Minimum Spend",
        type: 'Number',
        hasComment: true,
        hideOnProposal: true
      },
      {
        name: "Cost Per Extra Guest (beyond agreed upon qty)",
        type: 'Number',
        hasComment: true,
        labelForValue: "Cost",
        isExtraService: true,
        extraService: {
          label: "Cost Per Extra Guest (beyond agreed upon qty)"
        }
      },
      {
        name: "Overtime Cost(Rental)",
        type: 'Number',
        units: ["Per hour", "All togeter"],
        hasComment: true,
        isExtraService: true,
        extraService: {
          label: "Overtime Cost(Rental)"
        }
      },
      {
        name: "Additional Set-up Hours",
        type: 'Number',
        units: ["Per hour", "All togeter"],
        hasComment: true,
        isExtraService: true,
        extraService: {
          label: "Additional Set-up Hours"
        }
      },
      {
        name: "Late Night Fee",
        type: 'Number',
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
        type: 'Number',
        isPercentage: true,
        hasComment: true,
        attendees: null,
        labelForValue: "How much",
      },
      {
        name: "Tax rate",
        type: 'Number',
        isPercentage: true,
        hideOnProposal: true,
      },
      {
        name: "Suggested Gratuity",
        type: 'Number',
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
        type: 'Number',
        hasComment: true,
      },
      {
        name: "Pickup",
        type: 'Number',
        hasComment: true,
        isExtraService: true,
        extraService: {
          label: "Pickup"
        }

      },
      {
        name: "Cleanup",
        type: 'Number',
        hasComment: true,
        isExtraService: true,
        extraService: {
          label: "Cleanup"
        }
      },
      {
        name: "Late Night Fee",
        type: 'Number',
        hasComment: true,
        isExtraService: true,
        extraService: {
          label: "Late Night Fee"
        }
      },
      {
        name: "Breakdown",
        type: 'Number',
        hasComment: true,
        isExtraService: true,
        extraService: {
          label: "Breakdown"
        }
      },
      {
        name: "Discount for large quantities",
        type: 'Number',
        hideOnProposal: true,
        isPercentage: true,
        hasComment: true,
        attendees: null,
        labelForValue: "How much",
      },
      {
        name: "Tax rate",
        type: 'Number',
        isPercentage: true,
        hideOnProposal: true,
      },
      {
        name: "Suggested Gratuity",
        type: 'Number',
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
        type: 'Number',
        hasComment: true,
      },
      {
        name: "Setup",
        type: 'Number',
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
        type: 'Number',
        isPercentage: true,
        hideOnProposal: true,
      },
      {
        name: "Suggested Gratuity",
        type: 'Number',
        hasComment: true,
        isPercentage: true,
        hideOnProposal: true,
      },
      {
        name: "Service charges",
        type: 'Number',
        hasComment: true,
        hideOnProposal: true,
      },
    ],
  },
  {
    category: "administration",
    items: [
      {
        name: "Travel distance to event",
        type: 'Number',
        hasComment: true,
      },
      {
        name: "Special attire requests",
        type: 'Number',
        hasComment: true,
      },
      {
        name: "Last minute requests",
        type: 'Number',
        hasComment: true,
      },
      {
        name: "Discount for large quantities",
        type: 'Number',
        hideOnProposal: true,
        isPercentage: true,
        hasComment: true,
        attendees: null,
        labelForValue: "How much",
      },
      {
        name: "Tax rate",
        type: 'Number',
        isPercentage: true,
        hideOnProposal: true,
      },
      {
        name: "Suggested Gratuity",
        type: 'Number',
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
        type: 'Number',
        hasComment: true,
      },
      {
        name: "Rush order",
        type: 'Number',
        hasComment: true,
      },
      {
        name: "Discount for large quantities",
        type: 'Number',
        hideOnProposal: true,
        isPercentage: true,
        hasComment: true,
        attendees: null,
        labelForValue: "How much",
      },
      {
        name: "Tax rate",
        type: 'Number',
        isPercentage: true,
        hideOnProposal: true,
      },
      {
        name: "Suggested Gratuity",
        type: 'Number',
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
        type: 'Number',
        hasComment: true,
      },
      {
        name: "Extra setup and breakdown charge",
        type: 'Number',
        hasComment: true,
      },
      {
        name: "Late charge for returned items",
        type: 'Number',
        hasComment: true,
      },
      {
        name: "Damage to equipment",
        type: 'Number',
        hasComment: true,
      },
      {
        name: "Large quantity discount",
        type: 'Number',
        isPercentage: true,
        hasComment: true,
        attendees: null,
      },
      {
        name: "Off-season discount",
        type: 'Boolean',
        label: "Discount rate",
        labelForValue: 'How much',
        discount: null,
        hasUnit: true,
        units: ["%", "$"],
      },
      {
        name: "Quantity discount",
        type: 'Boolean',
        label: "Discount rage",
        labelForValue: 'How much',
        discount: null,
        hasUnit: true,
        units: ["%", "$"],
      },
      {
        name: "Tax rate",
        type: 'Number',
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
        type: 'Number',
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
        type: 'Number',
        hasComment: true,
      },
      {
        name: "Overtime",
        type: 'Number',
        hasComment: true,
      },
      {
        name: "Simulcasting bandwidth requirements",
        type: 'Number',
      },
      {
        name: "Tax rate",
        type: 'Number',
        isPercentage: true,
        hideOnProposal: true,
      },
      {
        name: "Discounts",
        type: 'Number',
        isPercentage: true,
        hasComment: true,
        hideOnProposal: true,
      },
      {
        name: "Suggested Gratuity",
        type: 'Number',
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
        type: 'Number',
        hasComment: true,
      },
      {
        name: "Delivery",
        type: 'Number',
        hasComment: true,
      },
      {
        name: "preparing file for printing",
        type: 'Number',
        hasComment: true,
      },
      {
        name: "Multiple print locations",
        type: 'Number',
        hasComment: true,
      },
      {
        name: "Number of different colors",
        type: 'Number',
        hasComment: true,
      },
      {
        name: "Tax rate",
        type: 'Number',
        isPercentage: true,
        hideOnProposal: true,
      },
      {
        name: "Discount for large quantites",
        type: 'Number',
        hideOnProposal: true,
        hasComment: true,
        labelForValue: "How much",
      },
      {
        name: "Suggested Gratuity",
        type: 'Number',
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
        type: 'Number',
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
        type: 'Number',
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
        type: 'Number',
        hasComment: true,
        labelForValue: "Number of hours",
        noSuffix: true,
        unit: "hour",
        hideOnProposal: true,
      },
      {
        name: "Rushed setup",
        subCategory: "charge",
        type: 'Number',
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
        type: 'Number',
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
        type: 'Number',
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
        type: 'Number',
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
        name: "Tax rate",
        type: 'Number',
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
        type: 'Number',
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
        type: 'Number',
        hasComment: true,
        value: ""
      },
      {
        name: "Additional Pictures (more than in package purchased)",
        type: 'Number',
        hasComment: true,
        value: ""
      },
      {
        name: "Discount for large quantity",
        type: 'Boolean',
        attendees: null,
        hideOnProposal: true,
        labelForValue: "How much",
        value: ""
      },
      {
        name: "Tax rate",
        type: 'Number',
        isPercentage: true,
        hideOnProposal: true,
        value: ""
      },
      {
        name: "Suggested Gratuity",
        type: 'Number',
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
    value: "administration",
    icon: "administration.svg",
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
  {
    name: "Security",
    value: "securityservices",
    icon: "securityservices.svg",
  },
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
export const categoryDescriptions = {
  venuerental: {
    company: [
        'Give your business event a completely unique ambience at the company_name, where relaxation and tranquility combine to create the perfect, discreet environment for any occasion. Surrounded by acres of green countryside, we offer the ideal setting that lets you and your team, partners, or customers “get away from it all” while still being just a 25-minute drive from a major city. It’s a great way to refresh, reset, and refocus on a new strategy, product launch, or company vision. No distractions, no hassle. Just complete privacy and excellent service in enchanting natural surroundings',
        'Welcome to company_name, the most advanced modern venue for business events of all types and scales. Since 2005, we have been proud to host dozens of major events covering every aspect of the business world, from board meetings and training sessions to product launches and international conferences. Conveniently located at the heart of a bustling urban center, close to a train station and airport, we are here to serve as your global meeting point for staff, customers, partners, and all other parties. company_name is part of the worldwide Hospitality Corporation and pledges to bring you the very best value and service at all times.',
        'company_name has been hosting weddings, teambuilding retreats, and events of all kinds since 1995. Founded by lifelong friends Rachel Smith and Rachel Jones, company_name offers a truly memorable experience for all your family and business occasions, conveniently close to a major city. Our 10,000 sqm venue lets you choose between three separate areas – our grand hall, standard hall, and banquet garden – or combine them, presenting a single magnificent experience for all your guests. No matter what kind of event you’re hosting, it will benefit from the dedicated service of our on-site staff, including personal attention from the founders themselves. And of course you’ll enjoy the incredible pastoral views that bring natural tranquility into even the most high-spirited event',
    ],
    service: [
        'Whether you’re seeking modern business facilities, timeless leisure options, or a combination of the two, we’re here to make your stay at company_name both memorable and productive. We offer flexible meeting and event options to suit your schedule and budget, with various room and hall sizes available. Our staff will be on hand to supply standard meeting items, like notepads, coffee service, and Wi-Fi access, with many optional extras including smart TVs, projectors, and more. For a full complementary experience, give your attendees unrestricted access to our famous spa, fitness room, and extensive gardens',
        'You’re doing business in a modern world and we understand the importance of technology to your success. That’s why our on-site technology team is ready to assist you with all your technical planning and implementation needs to ensure everything goes smoothly on the day. This can include everything from accommodating your own systems to supplying our own computer, lighting, sound, and other equipment as needed. Our flexibility also extends to meeting room size, as our halls are designed with optional dividers to ensure they meet your needs for space or privacy',
        'Above all, our venue is here to serve your vision. Almost every aspect of company_name can be customized to suit your needs, with three flexible event areas and a range of seating options (theater, classroom, boardroom, etc.), as well as complimentary parking for your guests. We are also able to supply a range of furnishings and equipment (such as microphones, speakers, a projector and flipchart), with Wi-Fi available throughout the venue. Our experts will be happy to consult with you on the options most appropriate for your event needs – including event staffing, valet parking, after-event cleaning, and so on',
    ],
    personal: [
        'Thank you for your interest in company_name! Whether you have visited us before or this will be your first time, we are sure that you will be very satisfied with the services and facilities we offer. Above and beyond our dedicated customer service and advanced amenities, the magical atmosphere here makes every Serafino Spa event a true success in every sense of the word – customers are impressed, employees are inspired, and the occasion is remembered for years afterward. Please do not hesitate to get in touch if you need any additional information',
        'We are delighted to present this proposal for your event at the company_name. Professionalism and efficiency are key values for us throughout all our activities and we will always go the extra mile to ensure your event is professional, efficient, and a great success in every way. We look forward to working with you on this event and helping you to overcome any challenge that may arise with creativity and optimism. We are confident that both you and your guests will enjoy a wonderful, hassle-free, and very productive event',
        'Hi, just a short note to say how much we appreciate you requesting a proposal from us. company_name is quite simply our pride and joy – a very special location that has helped to make lifelong memories for countless couples, families, and businesses over the past 25 years. It’s not just the beautiful venue itself, or the enchanting location with incredible views – it’s the unique company_name philosophy that means we always go the extra mile to ensure every detail of the event lives up to your expectations. We look forward to hosting you!'
    ]
  },

  foodandbeverage: {
    company: [
        'Welcome to company_name, the full-service corporate event catering company that puts a creative spin on all your gastronomic needs. Founded by acclaimed chef Iain Roussel, who has trained in both France and Japan, Kool Places specializes in unique fusion cuisine that is sure to delight and dazzle your guests at any event. We champion fresh local and seasonal ingredients wherever possible, and are dedicated to sustainability. Even more importantly, our team is ready to go above and beyond to ensure your event goes smoothly every step of the way',
        'Committed to wellbeing? So are we! Kat & Kris Catering brings you the best of international cuisine with an emphasis on fresh natural whole ingredients that will satisfy your guests’ appetites while improving their focus on your corporate event. After all, well-fed guests are satisfied guests. Our business, founded by us (Kat & Kris), recently celebrated our 25th anniversary and we’re so excited about continuing to serve planners and businesses in many more fields and locations. In a nutshell, we serve up the perfect blend of culinary innovation and traditional excellence',
        'CBA Catering is here to take your corporate event to the next level, with culinary delights that make every occasion a real multisensory feast. We have been specializing in food & beverage services for corporate events since 2011, with an outstanding culinary team that together have more than 50 years of experience across international cuisines and hospitality venues. At CBA Catering, we understand the crucial role that food plays in any event, shaping attendees’ satisfaction and overall impressions. That’s why we’re dedicated to helping you plan every detail, whether you need boxed meals or gourmet dinner service',
    ],
    service: [
        'When it comes to event catering, many planners feel forced to “play it safe” in terms of menu choices. As a result, cuisine can feel bland and uninspired, leading attendees to feel bored and unsatisfied as well. Kool Places gives you the secret to unlocking a world of outstanding flavors and beautifully presented dishes that guests will adore. We are here to ensure you can enjoy the very best fusion food while still accommodating a variety of dietary needs (vegetarian, vegan, gluten-free, etc.). From small meetings to large-scale galas and conferences, our team has the experience and insights you need to get the most out of every minute (and every bite) while staying within your budget',
        'Food is a cornerstone of any event, from board meetings to large-scale conventions. Whether we’re serving your staff, partners, customers, or all three, we aim to impress. Over our 25-year history, we have catered just about any kind of event you can imagine, and we are still committed to giving our clients innovative new options, whether that means simple tasty snacks to gastronomic delights that reflect the latest hot food trends. Most of all, we’re dedicated to creating the special menus that will serve your exact needs, whether that means sit-down dinners, hors d’oeuvres, food prepared to order right in front of the guests, or something else you have in mind!',
        'We have many years of experience catering events of all sizes, and our team will be happy to sit down with you to advise on everything from menus to presentation. Our focus isn’t just on the food, but on the entire purpose and focus of your event, so we can prepare offerings that suit the occasion – whether it’s a black-tie awards gala, bustling conference, or staff holiday party. That means we can provide a range of suitable options, including buffets, waiter service, finger food, and more. We are committed to taking care of every detail both leading up to the event and on the day, freeing you up to enjoy the gathering yourself',
    ],
    personal: [
        'Thanks for requesting this proposal – we truly can’t wait to get started on creating the perfect menus for your event. We view every event as a full collaboration and are happy to be as hands-on (or hands-off) as you like, in terms of suggesting creative approaches and suitable options that will be appropriate to guest needs as well as your overall theme. Above all, we’re here to ensure the success of your event, with absolute professionalism at all times',
        'Hello and thank you for getting in touch with Kat & Kris Catering! We bring a real personal touch to all our events and look forward to working with you on this one. Rest assured we will use our decades of experience to make sure that every detail is not only planned, but actually goes to plan on the day itself. In a world where every moment and every bite makes a difference, we’re happy to have the opportunity to make that difference with you!',
        'Thank you for your interest in CBA Catering! We know that you have high expectations – and that your attendees’ expectations might be higher still. This is why we pride ourselves on our creative food  & beverage choices that both complement and enhance your event, as well as our flawless execution of meticulous plans. We are certain that your guests will be satisfied and delighted by our offering, which will make your event a real time to remember!',
    ],
  },

  decor:{
    company: [
        'company_name is the award-winning event design company dedicated to creating impactful, unforgettable experiences for you and your guests. Our portfolio includes work for companies large and small in this metropolitan region, including product launches, gala dinners, and staff parties. Whatever the occasion, businesses in all industries prefer company_name, for our personal touch and clear, transparent communication throughout the entire event planning and production process. More than anything, we are here to design your vision and bring your concepts to life – or develop creative options for your consideration. The DDD team is ready to spring into action',
        'company_name is a corporate event design company that provides professional design and décor services for business gatherings of all kinds nationwide. Since 2000, we have been setting new industry standards with our creative approach to every aspect of the event: design concepts, décor, furnishings, fabrics, and more. From initial concept to the day-of, we specialize in bringing a touch of genuine magic to every occasion, ensuring attendees are both engaged and inspired. Our team is experienced in accommodating the requirements for any corporate event, no matter the size, theme, or purpose. We always look forward to our next challenge!',
        'Welcome to company_name, the full-service event design and décor business specializing in corporate events. We have been active in this field for over 20 years, bringing contemporary design excellence together with traditionally high standards of customer service, and every event gives us the opportunity to raise the bar even higher. With each occasion, small or large scale, we aim to develop fine professional designs that seamlessly merge your requirements with a genuine sense of wonder. Enhancing and complementing your brand, our design and décor offering ensures an event to remember',
    ],
    service: [
        'Every project we undertake begins by sitting down with you, the client, to fully understand the event’s aims and theme, as well as various constraints. We pride ourselves on transforming the initial concept into a living, breathing showcase for your brand, complete with décor, furnishings, and more. This might mean an intimate board meeting or an international convention welcoming hundreds of guests – our capabilities can encompass every need and challenge. Our team is exceptionally detail-oriented, not just in terms of the design but also when it comes to project and timeline planning, so you never have to worry about a thing',
        'We believe in the power of design to immerse your guests in a full, multisensory immersive experience. These experiential designs not only make an impression at the time, giving all attendees a comprehensive feel of your brand identity, but also ensure that your event stands out from all others in the memory – a vitally important factor in today’s competitive environment. The skilled company_name team is ready to meet all your needs, large and small, to brand and transform locations, including custom builds and staging requirements. Every event is an exciting collaboration and we can’t wait to get started!',
        'The in-house company_name team excels at telling your story in the most immersive, imaginative way. From simple yet effective branding to custom builds and complete interactive experiences, we have the skills and capabilities needed to transform the event into something truly special. Our interior design services include furnishings, drapery, accessories, and beyond, as we craft a one-of-a-kind design for your corporate occasion. Additionally, we can provide a wide range of technical and audiovisual equipment, or work in sync with other vendors to ensure a smooth yet dynamic experience for all attendees',
    ],
    personal: [
        'Thanks for getting in touch with us at company_name! We are confident that we will be able to make your corporate event a success from every perspective – impressed guests, impressed bosses, and a de-stressed you! First and foremost, we’re here to take the weight off your shoulders and do exactly what you need us to – whether that’s following strict predefined guidelines or coming up with those outside-the-box ideas no one else could have imagined. We also have excellent relationships throughout this area and are happy to work with and/or recommend other vendors for your consideration',
        'It’s time to bring your vision to life! At company_name, we love nothing better than infusing your concept with vibrant shape and color, taking it from the page to reality. Thank you for this opportunity to present our proposal for your upcoming event. We are sure that we will bring that extra something special to every element of the event, offering creative solutions that not only dazzle your attendees but also make your life easier. Start getting ready for a wonderful event where you will enjoy every single minute',
        'Thanks for bringing company_name on your event production journey! We hope that this proposal includes all the details you need – but please feel free to get in touch for any clarifications. Believe us, we’re always happy to talk design! Seriously, though, we’re thrilled at the prospect of helping you create this corporate event, and look forward to delighting and amazing your guests with creative new concepts. We hope to start working together very soon!',
    ],
  },

  administration: {
    company: [
        'company_name is a leading guest relations and event staffing firm. Established in 2005, we are delighted to present a full range of hospitality services designed to meet the needs of any corporate event, large or small. From meetings to conferences, and everything in between, we always uphold the highest service standards, aspiring to constantly raise the bar for professionalism and client satisfaction. Thanks to our skilled, responsive staff and advanced capabilities, we can go above and beyond to make your event a success in every way.',
        'Welcome to company_name, where we specialize in being the active link between you and your guests – before, during, and after the event itself. We offer complete guest relation services for corporate events of all kind, with extensive experience in gala dinners, award ceremonies, conferences, and other large-scale occasions with dozens or even hundreds of attendees. Throughout every stage of the event planning and execution process, we become professional representatives of your brand, ensuring that we reflect the very best in both efficiency and customer service. Above all, our goal is to take care of those administrative and management tasks for you, freeing you up to enjoy the event as a guest yourself!',
        'Outstanding service is the primary value at company_name, where we pride ourselves on offering the very best guest services and staffing solutions to corporate event planners, as well as to the actual event attendees. Our professional team is on call to provide you with the complete solution you need for any and all aspects of your event. We have served a wide range of business events, including product launches, dinners, board meetings, and conventions, with extensive capabilities that ensure smooth sailing from start to finish',
    ],
    service: [
        'Everything we do at company_name is designed to ensure that each event is a positive experience for every attendee. That can include pre-event services, such as travel and hotel booking, as well as on-site event staffing, when our courteous professional team will serve as a natural extension of your existing staff. All company_name team members are fully trained and able to assist with accessibility matters, as well as safe crowd management, in addition to helping guests with specific issues, and even finding “lost” guests if needed. Above all, we are here to serve your needs, becoming the last piece of the puzzle when making sure that all goals are accomplished and no stone is left unturned',
        'Our skilled guest services and staffing team is ready to deliver a comprehensive solution for all aspects of your event. In the pre-event stage, we are able to handle all kinds of inquiries, including compiling information about dietary requirements and accessibility needs. Our team is also proficient at organizing attendee travel and accommodation, from providing suitable recommendations to performing the actual bookings as and when needed. In addition, we can attend the event in person, with our highly professional team ready to assist guests with every question and issue, keeping things running smoothly at all times',
        'Our event staffing services use dedicated guest service attendants, who fill a complementary role with your own on-site personnel during an event. Each attendant is a trained, experienced professional with exemplary personal presentation, and can serve in various positions as required during the event, including as an usher, parking attendant, and general assistant catering to all guest needs, as and when they arise. Above all, we are here to ensure that your event goes according to plan, from guest arrival (directions, transport, hotels) to the event itself (dietary requirements, crowd management, etc.) and beyond',
    ],
    personal: [
        'Thanks for contacting us! We are happy to provide this proposal and hope it suits your needs. There is simply nothing like first-class service when it comes to generating optimal event buzz, pleasing guests, and achieving your event objectives. And first-class service is exactly what we offer. Please reach out if you need additional details or clarifications – we’re always ready to answer questions and make life easier for you. We look forward to working together!',
        'We just wanted to thank you personally for your interest in company_name. As a long-established company in the guest services and staffing field, we can assure you that we only ever provide top-quality service. This is the quality standard that has gained us many satisfied clients over the years, from the largest multinational corporations to smaller local businesses. No matter the event, size, or goal, we are here to ensure maximum enjoyment for you as well as all attendees',
        'At company_name, we absolutely believe that your guests deserve the best! We are committed to ensuring that every guest enjoys each event to the fullest, free from stress, worry, or disappointment of any kind. So thank you for requesting a proposal from us. We look forward to making sure that your event is truly one to remember, while becoming a seamless, professional part of your own team. Feel free to get in touch with any questions or if there’s anything we can explain for you. We are very flexible and willing to go the extra mile for our clients!',
    ],

  },

  administration: {
    company: [
      'company_name is a leading guest relations and event staffing firm. Established in 2005, we are delighted to present a full range of hospitality services designed to meet the needs of any corporate event, large or small. From meetings to conferences, and everything in between, we always uphold the highest service standards, aspiring to constantly raise the bar for professionalism and client satisfaction. Thanks to our skilled, responsive staff and advanced capabilities, we can go above and beyond to make your event a success in every way.',
      'Welcome to company_name, where we specialize in being the active link between you and your guests – before, during, and after the event itself. We offer complete guest relation services for corporate events of all kind, with extensive experience in gala dinners, award ceremonies, conferences, and other large-scale occasions with dozens or even hundreds of attendees. Throughout every stage of the event planning and execution process, we become professional representatives of your brand, ensuring that we reflect the very best in both efficiency and customer service. Above all, our goal is to take care of those administrative and management tasks for you, freeing you up to enjoy the event as a guest yourself!',
      'Outstanding service is the primary value at company_name, where we pride ourselves on offering the very best guest services and staffing solutions to corporate event planners, as well as to the actual event attendees. Our professional team is on call to provide you with the complete solution you need for any and all aspects of your event. We have served a wide range of business events, including product launches, dinners, board meetings, and conventions, with extensive capabilities that ensure smooth sailing from start to finish',
    ],
    service: [
      'Everything we do at company_name is designed to ensure that each event is a positive experience for every attendee. That can include pre-event services, such as travel and hotel booking, as well as on-site event staffing, when our courteous professional team will serve as a natural extension of your existing staff. All company_name team members are fully trained and able to assist with accessibility matters, as well as safe crowd management, in addition to helping guests with specific issues, and even finding “lost” guests if needed. Above all, we are here to serve your needs, becoming the last piece of the puzzle when making sure that all goals are accomplished and no stone is left unturned',
      'Our skilled guest services and staffing team is ready to deliver a comprehensive solution for all aspects of your event. In the pre-event stage, we are able to handle all kinds of inquiries, including compiling information about dietary requirements and accessibility needs. Our team is also proficient at organizing attendee travel and accommodation, from providing suitable recommendations to performing the actual bookings as and when needed. In addition, we can attend the event in person, with our highly professional team ready to assist guests with every question and issue, keeping things running smoothly at all times',
      'Our event staffing services use dedicated guest service attendants, who fill a complementary role with your own on-site personnel during an event. Each attendant is a trained, experienced professional with exemplary personal presentation, and can serve in various positions as required during the event, including as an usher, parking attendant, and general assistant catering to all guest needs, as and when they arise. Above all, we are here to ensure that your event goes according to plan, from guest arrival (directions, transport, hotels) to the event itself (dietary requirements, crowd management, etc.) and beyond',
    ],
    personal: [
      'Thanks for contacting us! We are happy to provide this proposal and hope it suits your needs. There is simply nothing like first-class service when it comes to generating optimal event buzz, pleasing guests, and achieving your event objectives. And first-class service is exactly what we offer. Please reach out if you need additional details or clarifications – we’re always ready to answer questions and make life easier for you. We look forward to working together!',
      'We just wanted to thank you personally for your interest in company_name. As a long-established company in the guest services and staffing field, we can assure you that we only ever provide top-quality service. This is the quality standard that has gained us many satisfied clients over the years, from the largest multinational corporations to smaller local businesses. No matter the event, size, or goal, we are here to ensure maximum enjoyment for you as well as all attendees',
      'At company_name, we absolutely believe that your guests deserve the best! We are committed to ensuring that every guest enjoys each event to the fullest, free from stress, worry, or disappointment of any kind. So thank you for requesting a proposal from us. We look forward to making sure that your event is truly one to remember, while becoming a seamless, professional part of your own team. Feel free to get in touch with any questions or if there’s anything we can explain for you. We are very flexible and willing to go the extra mile for our clients!',
    ],
  },

  audiovisualstagingservices: {
    company: [
      'We’re here to deliver a powerful, professional audiovisual experience that will take your corporate event to the next level – and beyond. company_name is a proud family business that was established in 1995 and has continually evolved and expanded our services to ensure that your event always benefits from genuine state-of-the-art AV and staging solutions. We combine industry experience, technical expertise, and creative flair to give you reliable services you can trust for all your needs, always ensuring complete safety and an enjoyable experience for attendees, as well as the planner (that’s you!).',
    ],
    service: [
      'By offering the broadest service range in the area, we’re able to provide a flexible response to events of any size or type, from small-scale gatherings to huge conventions and gala dinners, and everything in between. Our staff can consult with you and the venue on the best staging options, and then perform safe implementation in line with pre-defined layouts. On the AV side, we have a large inventory of in-house equipment at your service, including cutting-edge lighting, audio systems, digital consoles, LED walls… Whatever you can imagine, we can bring to life, creating an appealing ambience for all attendees and making sure that your brand has a real positive impact.',
    ],
    personal: [
      'At company_name, we are committed to bringing your event vision to life, putting our decades of experience to work for your benefit in terms of creating a professional, memorable corporate event that achieves all your goals without any of the stress. Thank you for your interest in working on an event with us. We hope that this proposal meets your expectations – rest assured we are as dedicated to your schedules and objectives as you are, and will go the extra mile to make the event a success.',
    ],

  },

  entertainment: {
    company: [
      'company_name makes it easy to make your event incredible, with a wide range of entertainment options to suit any need, theme, or budget. We have been serving corporate events since 2003 with our outstanding customer service and attention to detail – plus an impressive roster of acclaimed entertainers ranging from jazz pianists to party bands, magicians, circus acts, and much more. Above all, we deliver service you can trust, with personal contact, regular updates, and complete transparency. Believe us, we’re pretty good at juggling all the elements of an event – and never dropping the ball!',
    ],
    service: [
      'Surprising entertainment doesn’t have to come with off-stage surprises too. The company_name team specializes in making the entire process smooth and stress-free, so you can sit back and enjoy the show! We can supply you with a variety of options with your selected venue in mind that will perfectly complement the tone, theme, and goals of your event. On top of planning every moment of the entertainment in advance, our team will also be on site to handle entertainers’ needs. Of course, all our entertainers are experienced, pre-vetted professionals with excellent resumes that testify to hundreds of satisfied customers in recent years. We will also be happy to provide references as needed.',
    ],
    personal: [
      'Hi, how are you? We’re pleased to provide this proposal for your upcoming corporate event and hope that we will be able to work together to create something truly magical and memorable for all your attendees. We are all very passionate about entertainment and crafting just the right show that everyone will enjoy, while also fulfilling your schedule and budget requirements. Please get in touch if you have questions or need any additional details.',
    ],

  },

  giveaways: {
    company: [
      'company_name is dedicated to providing your event with unique, thoughtful, and impactful gifts that delight and inspire all attendees. We have been serving the business community for over a decade, gaining an extensive portfolio of satisfied clients across diverse industries, while also garnering experience in gifts and giveaways for events of all types and sizes. Gifts not only show appreciation, but also establish and strengthen important relationships with clients, employees, partners, and guests. Our expert team will be happy to work with you to develop the right plan for your event.',
    ],
    service: [
      'We believe that every gift should be special, just like your brand and your event. That’s why we take care to curate the perfect gift and giveaway concepts that not only suit your budget, but also ideally complement your brand identity and values. From pens, stationery, mugs, and mobile accessories to watches, electronics, and more sophisticated gift ideas, company_name can guarantee exemplary quality that will reflect well on your brand every time the gift is used or noticed. No matter whether you are appealing to executives, travelers, athletes, hi-tech professionals, or a wide cross-section of interests, we offer the perfect options that will be appreciated for weeks and months after the event.',
    ],
    personal: [
      'Thank you for requesting this price quote. We always look forward to applying our unique skills, experience, and perspective to a new event, and to helping planners build strong bonds with attendees going forward. Our most basic aim is to make your life easier, by supplying options in line with your defined needs, while also doing the legwork to find just the right gift or giveaway for your brand identity, target audience, and event goals. So let’s get started!',
    ],

  },

  signageprinting: {
    company: [
      'Welcome to company_name, where we take your event signage personally! We are known as the home of custom printed event signage, offering a comprehensive solution for all the printed materials you need to make your corporate event truly special. With more than two decades of industry experience, we print custom signage and other materials at our in-house studio, meaning you can rely on our hands-on approach for outstanding quality control every step of the way. Let’s work together to make your event a memorable experience for all your attendees.',
    ],
    service: [
      'We understand that every event has unique needs and that every company has its own unique identity to express. That’s why, at company_name, we help your brand stand out from the crowd with every printed element: welcome banners, sponsor signs, directional signage, event programs, schedules, menus, inviting displays, and much more. Even the smallest item can make a huge impression, conveying your brand’s professionalism, appeal, and USP. We offer a full response to all your needs, taking the time to learn about the event’s goals in order to ensure that we provide the best quality solutions within your budget and schedule.',
    ],
    personal: [
      'Just a quick note to say thanks for requesting this price quote! We are always delighted to work on a broad range of corporate events, providing a comprehensive professional solution that covers all your  custom signage and printed materials in a way that is not only clear and informative, but also creative and engaging. The whole company_name team looks forward to getting to know more about your brand, event, and expectations going forward. We’re confident this will be a top-notch event in every way! Just get in touch if you need any more information.',
    ],

  },


}

