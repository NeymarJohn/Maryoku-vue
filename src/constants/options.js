export const GuaranteedOptions = [
  { value: "mask_wearing", label: "Mask wearing" },
  { value: "enhanced_cleaning", label: "Enhanced cleaning" },
  { value: "cancellation", label: "Cancellation in mitigating circumstances" },
  { value: "social_distancing", label: "Social distancing" },
  { value: "vaccination_certificate", label: "Vaccination Certificate" }
];

export const DiscountOptions = [
    { value: "highest_discount", label: "Highest discount" },
    { value: "lowest_discount", label: "Lowest discount" },
    { value: "decoration", label: "Decoration" },
];

export const DiscountTabOptions = [
    { value: "coupon", label: "Coupon" },
    { value: "number_of_guests", label: "Number Of Guests" },
    { value: "customer_type", label: "Customer Types" },
    { value: "seasonal", label: "Seasonal" },
];

export const CouponRules = [
    {label: "", value: 0},
    {label: "Greater Than", value: 1},
    {label: "Less Than", value: 2},
];
export const DiscountCustomerTypes = [
    {label: "", value: 0},
    {label: "New", value: 1},
    {label: "Return", value: 2},
];

export const MonthOptions = [
    {label: "January", value: 1},
    {label: "February", value: 2},
    {label: "March", value: 3},
    {label: "April", value: 4},
    {label: "May", value: 5},
    {label: "Jun", value: 6},
    {label: "July", value: 7},
    {label: "August", value: 8},
    {label: "September", value: 9},
    {label: "October", value: 10},
    {label: "November", value: 11},
    {label: "December", value: 12},
];

export const DefNa = [
    {
        name: "Food & Beverage",
        value: "foodandbeverage",
    },
    {
        name: "Design and Decor",
        value: "decor",
    },
    {
        name: "Entertainment",
        value: "entertainment",
    },
    {
        name: "Security",
        value: "securityservices",
    },
    {
        name: "Videography and Photography",
        value: "videographyandphotography",
    },
    {
        name: "Equipment Rental",
        value: "equipmentrentals",
    },
    {
        name: "Staffing and Guest Services",
        value: "staffingandguestservices",
    },
    {
        name: "Rentals",
        value: "rentals",
    },
    {
        name: "Other",
        value: "Other",
    },
];

export const CancellationData = [
  {
    notice: "the client cancel on the day of the Event",
    vendorPayout: "the client will pay in full",
    cancellationFee: "full Payment-no refund will be given"
  },
  {
    notice: "the client cancel less than a week prior of the Event but not on the day of the Event",
    vendorPayout: "the client will pay 80% ",
    cancellationFee: "full Payment-no refund will be given"
  },
  {
    notice: "the client cancel less than two weeks prior of the Event bu more than one week prior to the Event",
    vendorPayout: "the client willl pay 60%",
    cancellationFee: "80% Payment(20% refunded to Planner)"
  },
  {
    notice: "the client cancel more than two weeks prior to the Event",
    vendorPayout: "the client will pay 15% equivalent to down payment",
    cancellationFee: "Down payment will not be refunded"
  }
];
