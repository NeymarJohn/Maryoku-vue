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
    {label: "Same as", value: 3},
];
export const DiscountCustomerTypes = [
    {label: "", value: 0},
    {label: "New", value: 1},
    {label: "Return", value: 2},
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
