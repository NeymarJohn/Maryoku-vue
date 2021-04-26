export const timelineBlockItems = [
    [
        {
            id: 1,
            buildingBlockType: "setup",
            eventCategory: [
                'venuerental'
                // 'equipmentrentals',
                // 'securityservices',
                // 'giveaways',
                // 'videographyandphotography',
                // 'advertising-promotion',
                // 'audiovisualstagingservices',
                // 'signageprinting',
                // 'corporatesocialresponsibility',
                // 'meetingorganizationfees',
                // 'technologyservices',
                // 'decor',
                // 'shipping',
                // 'administration'
            ],
            icon: "Setup",
            color: "#ffc001",
        },
        {
            id: 5,
            buildingBlockType: "Transportation",
            eventCategory: ['transportation'],
            icon: "Transportation",
            color: "#44546a",
        },
    ],

    [
        {
            id: 2,
            buildingBlockType: "activity",
            icon: "Activity",
            color: "#20c997",
            eventCategory: ['entertainment'],
        },
        {
            id: 8,
            buildingBlockType: "Show",
            icon: "Show",
            color: "#00bcd4",
            eventCategory: ['entertainment'],
        },
        {
            id: 9,
            buildingBlockType: "Speaker / Keynote",
            icon: "speaker",
            color: "#641956",
            eventCategory: ['entertainment'],
        },

        {
            id: 4,
            buildingBlockType: "Discussion",
            icon: "Discussion",
            color: "#3a3838",
            eventCategory: ['meetingorganizationfees'],
        },
    ],

    [
        {
            id: 10,
            buildingBlockType: "Break",
            icon: "Break",
            color: "#ff527c",
            eventCategory: ['entertainment'],
        },
        {
            id: 6,
            buildingBlockType: "Relaxation",
            icon: "Relaxation",
            color: "#0caf50",
            eventCategory: ['entertainment'],
        },
        {
            id: 3,
            buildingBlockType: "meal",
            icon: "Meal",
            color: "#f44336",
            eventCategory: ['foodandbeverage'],
        },
    ],

    [
        {
            id: 7,
            buildingBlockType: "Other",
            icon: "other",
            color: "#a5a5a5",
        },
    ],
];

export const timelineTempates = [
    { name: "registration", type: "group" },
    { name: "activity-1", type: "group" },
    { name: "meal", type: "group" },
    { name: "activity-2", type: "group" },
    { name: "summary", type: "group" },
];

export const serviceCategoryImages = {
    "venuerental": [
        "Venue+Type/Academic Venue_Shutterstock.jpg",
        "Venue+Type/Bar or Pub or Club_Shutterstock.jpg",
        "Venue+Type/Community Center_Shutterstock.jpg",
        "Venue+Type/Gallery_Option 1_Canva Free.png",
        "Venue+Type/Garden_Option 1_Shutterstock.jpg",
        "Venue+Type/Historic Establishment_Canva Pro.png",
        "Venue+Type/Meeting Room_Shutterstock.jpg",
        "Venue+Type/Restaurant_Shutterstock.jpg",
        "Venue+Type/Sports Club_Shutterstock.jpg",
        "Venue+Type/Stadium_Shutterstock.jpg",
        "Venue+Type/Stately Home_Option 1_Shutterstock.jpg",
    ],
    "foodandbeverage": [
        "Beverage/Beer_Canva Pro.png",
        "Beverage/Bourbon_Canva Pro.png",
        "Beverage/Champagne_Canva Pro.png",
        "Beverage/Cocktail_Canva Pro.png",
        "Beverage/Coffee _ Dream_Canva Pro.png",
        "Beverage/Margarita_Canva Pro.png",
        "Beverage/Martini_Canva Pro.png",
        "Beverage/Mixology_Canva Pro.png",
        "Beverage/Rum_Canva Pro.png",
        "Beverage/Soft Drinks_Option 1_Canva Pro.png",
        "Beverage/Soft Drinks_Option 2_Canva Pro.png",
        "Beverage/Sparkling Water_Canva Pro.png",
        "Beverage/Still Water_Canva Pro.png",
        "Beverage/Tequila_Canva Pro.png",
        "Beverage/Vodka_Canva Pro.png",
        "Beverage/Whiskey_Canva Pro.png",
        "Beverage/Wine_Canva Pro.png",
    ],
    "entertainment": [
        "Staff/Concierge 2.png",
        "Staff/Day Of Coordinator Option 2.jpg",
        "Staff/Event Model 1.png",
        "Staff/Event Registration 1.png",
        "Staff/shutterstock_72321160.jpg",
        "Staff/Transportation Host.png",
        "Staff/Wait Staff 1.png",
    ],
    "equipmentrentals": [
        "Staff/Concierge 2.png",
        "Staff/Day Of Coordinator Option 2.jpg",
        "Staff/Event Model 1.png",
        "Staff/Event Registration 1.png",
        "Staff/shutterstock_72321160.jpg",
        "Staff/Transportation Host.png",
        "Staff/Wait Staff 1.png",
    ],
    "securityservices": [
        "Staff/Concierge 2.png",
        "Staff/Day Of Coordinator Option 2.jpg",
        "Staff/Event Model 1.png",
        "Staff/Event Registration 1.png",
        "Staff/shutterstock_72321160.jpg",
        "Staff/Transportation Host.png",
        "Staff/Wait Staff 1.png",
    ],
    "giveaways": [
        "Giveaways/Apparel_Canva Pro.png",
        "Giveaways/Ceremonial Items_Canva Pro.png",
        "Giveaways/Drinkware_Canva Pro.png",
        "Giveaways/Fitness_Canva Pro.png",
        "Giveaways/Gadgets - Option2.jpg",
        "Giveaways/Gadgets.png",
        "Giveaways/Office Items_Canva Pro.png",
        "Giveaways/Specialty Food _ Liquor_Canva Pro.png",
        "Giveaways/Tote Bags_Canva Pro.png",
        "Giveaways/Travel Accessories_Canva Pro.png",
        "Giveaways/Travel Accessories_Option 2.jpg",
        "Giveaways/Wellness_Canva Pro.png",
    ],
    "videographyandphotography": [
        "Photography+_+Videography/Black_White.jpg",
        "Photography+_+Videography/Buisness.jpg",
        "Photography+_+Videography/Candid.jpg",
        "Photography+_+Videography/Commercial.jpg",
        "Photography+_+Videography/Drone.jpg",
        "Photography+_+Videography/Portrait.jpg",
    ],
    "advertising-promotion": [
        "Indoor Activities/Casino Games 2.png",
        "Indoor Activities/Indoor Sport.png",
        "Indoor Activities/Make Your Own.png",
        "Indoor Activities/Photo Booth 2.png",
    ],
    "audiovisualstagingservices": [
        "A-V/Lighting_Shutterstock.jpg",
        "A-V/Plasma TV_Canva Pro.png",
        "A-V/Projector_Shutterstock.jpg",
    ],
    "signageprinting": [
        "A-V/Lighting_Shutterstock.jpg",
        "A-V/Plasma TV_Canva Pro.png",
        "A-V/Projector_Shutterstock.jpg",
    ],
    "corporatesocialresponsibility": [
        "A-V/Lighting_Shutterstock.jpg",
        "A-V/Plasma TV_Canva Pro.png",
        "A-V/Projector_Shutterstock.jpg",
    ],
    "meetingorganizationfees": ["A-V/Lighting_Shutterstock.jpg",
        "A-V/Plasma TV_Canva Pro.png",
        "A-V/Projector_Shutterstock.jpg",],
    "transportation": [
        "Transportation/Air Services_Canva Pro.png",
        "Transportation/ATV_Canva Pro.png",
        "Transportation/Bicycle_Canva Pro.png",
        "Transportation/Boat_Canva Pro.png",
        "Transportation/Bus_Canva Pro.png",
        "Transportation/Ferry_Canva Pro.png",
        "Transportation/Gold Carts_Canva Pro.png",
        "Transportation/Private Black Car.jpg",
        "Transportation/Van_Canva Pro.png",
    ],
    "decor": [
        "Decor/Florals_Option 1_Canva Pro.png",
        "Decor/Interior Design_Canva Free.png",
        "Decor/Lighting_Canva Pro.png",
    ],
    "shipping": [
        "A-V/Lighting_Shutterstock.jpg",
        "A-V/Plasma TV_Canva Pro.png",
        "A-V/Projector_Shutterstock.jpg",
    ],
    "other": [],
}