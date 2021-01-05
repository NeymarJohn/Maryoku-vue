export const timelineBlockItems = [
    [
        {
            id: 1,
            buildingBlockType: "setup",
            eventCategory: [''],
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
            eventCategory: ['meetingorganizationfees', 'venuerental'],
        },
        {
            id: 8,
            buildingBlockType: "Show",
            icon: "Show",
            color: "#00bcd4",
            eventCategory: ['videographyandphotography'],
        },
        {
            id: 9,
            buildingBlockType: "Speaker / Keynote",
            icon: "speaker",
            color: "#641956",
            eventCategory: ['venuerental'],
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
