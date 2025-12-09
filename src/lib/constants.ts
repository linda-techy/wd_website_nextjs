// Constants for state and district data

// Project Type Constants (aligned with portal)
export const PROJECT_TYPES = [
  { displayText: "Turnkey Project", value: "turnkey_project" },
  { displayText: "Residential Construction", value: "residential_construction" },
  { displayText: "Commercial Construction", value: "commercial_construction" },
  { displayText: "Interior Work", value: "interior_work" },
  { displayText: "Renovation / Remodeling", value: "renovation_remodeling" }
];

// Customer Type Constants (aligned with portal)
export const CUSTOMER_TYPES = [
  { displayText: "Individual / Homeowner", value: "individual" },
  { displayText: "Business / Corporate Client", value: "business" },
  { displayText: "Government / Public Sector", value: "government" },
  { displayText: "Institution / Organization", value: "institution" },
  { displayText: "Channel Partner", value: "channel_partner" },
  { displayText: "Other", value: "other" }
];

// Priority Constants (aligned with portal)
export const PRIORITY_TYPES = [
  { displayText: "Low", value: "low" },
  { displayText: "Medium", value: "medium" },
  { displayText: "High", value: "high" }
];

export const STATE_LIST = [
  { displayText: "Kerala", value: "Kerala" },
  { displayText: "Tamil Nadu", value: "Tamil Nadu" },
  { displayText: "Karnataka", value: "Karnataka" },
  { displayText: "Andhra Pradesh", value: "Andhra Pradesh" },
  { displayText: "Telangana", value: "Telangana" },
  { displayText: "Maharashtra", value: "Maharashtra" },
  { displayText: "Goa", value: "Goa" },
  { displayText: "Gujarat", value: "Gujarat" },
  { displayText: "West Bengal", value: "West Bengal" },
  { displayText: "Uttar Pradesh", value: "Uttar Pradesh" },
  { displayText: "Delhi", value: "Delhi" }
];

export const DISTRICT_LIST = [
  // Kerala Districts (matching portal format)
  { displayText: "Alappuzha", value: "Alappuzha", state: "Kerala" },
  { displayText: "Ernakulam", value: "Ernakulam", state: "Kerala" },
  { displayText: "Idukki", value: "Idukki", state: "Kerala" },
  { displayText: "Kannur", value: "Kannur", state: "Kerala" },
  { displayText: "Kasaragod", value: "Kasaragod", state: "Kerala" },
  { displayText: "Kollam", value: "Kollam", state: "Kerala" },
  { displayText: "Kottayam", value: "Kottayam", state: "Kerala" },
  { displayText: "Kozhikode", value: "Kozhikode", state: "Kerala" },
  { displayText: "Malappuram", value: "Malappuram", state: "Kerala" },
  { displayText: "Palakkad", value: "Palakkad", state: "Kerala" },
  { displayText: "Pathanamthitta", value: "Pathanamthitta", state: "Kerala" },
  { displayText: "Thiruvananthapuram", value: "Thiruvananthapuram", state: "Kerala" },
  { displayText: "Thrissur", value: "Thrissur", state: "Kerala" },
  { displayText: "Wayanad", value: "Wayanad", state: "Kerala" },
  
  // Tamil Nadu Districts (major ones)
  { displayText: "Chennai", value: "Chennai", state: "Tamil Nadu" },
  { displayText: "Coimbatore", value: "Coimbatore", state: "Tamil Nadu" },
  { displayText: "Madurai", value: "Madurai", state: "Tamil Nadu" },
  { displayText: "Tiruchirappalli", value: "Tiruchirappalli", state: "Tamil Nadu" },
  { displayText: "Salem", value: "Salem", state: "Tamil Nadu" },
  { displayText: "Tirunelveli", value: "Tirunelveli", state: "Tamil Nadu" },
  { displayText: "Erode", value: "Erode", state: "Tamil Nadu" },
  { displayText: "Vellore", value: "Vellore", state: "Tamil Nadu" },
  { displayText: "Thanjavur", value: "Thanjavur", state: "Tamil Nadu" },
  
  // Karnataka Districts (major ones)
  { displayText: "Bengaluru Urban", value: "Bengaluru Urban", state: "Karnataka" },
  { displayText: "Mysuru", value: "Mysuru", state: "Karnataka" },
  { displayText: "Dakshina Kannada", value: "Dakshina Kannada", state: "Karnataka" },
  { displayText: "Belagavi", value: "Belagavi", state: "Karnataka" },
  { displayText: "Dharwad", value: "Dharwad", state: "Karnataka" },
  { displayText: "Kalaburagi", value: "Kalaburagi", state: "Karnataka" },
  { displayText: "Udupi", value: "Udupi", state: "Karnataka" },
  
  // Andhra Pradesh Districts (major ones)
  { displayText: "Visakhapatnam", value: "Visakhapatnam", state: "Andhra Pradesh" },
  { displayText: "Guntur", value: "Guntur", state: "Andhra Pradesh" },
  { displayText: "Krishna", value: "Krishna", state: "Andhra Pradesh" },
  { displayText: "Chittoor", value: "Chittoor", state: "Andhra Pradesh" },
  
  // Telangana Districts
  { displayText: "Hyderabad", value: "Hyderabad", state: "Telangana" },
  { displayText: "Rangareddy", value: "Rangareddy", state: "Telangana" },
  { displayText: "Medchal-Malkajgiri", value: "Medchal-Malkajgiri", state: "Telangana" },
  
  // Maharashtra Districts (major ones)
  { displayText: "Mumbai City", value: "Mumbai City", state: "Maharashtra" },
  { displayText: "Mumbai Suburban", value: "Mumbai Suburban", state: "Maharashtra" },
  { displayText: "Pune", value: "Pune", state: "Maharashtra" },
  { displayText: "Nagpur", value: "Nagpur", state: "Maharashtra" },
  { displayText: "Thane", value: "Thane", state: "Maharashtra" },
  
  // Goa Districts
  { displayText: "North Goa", value: "North Goa", state: "Goa" },
  { displayText: "South Goa", value: "South Goa", state: "Goa" },
  
  // Gujarat Districts (major ones)
  { displayText: "Ahmedabad", value: "Ahmedabad", state: "Gujarat" },
  { displayText: "Surat", value: "Surat", state: "Gujarat" },
  { displayText: "Vadodara", value: "Vadodara", state: "Gujarat" },
  { displayText: "Rajkot", value: "Rajkot", state: "Gujarat" },
  
  // West Bengal Districts (major ones)
  { displayText: "Kolkata", value: "Kolkata", state: "West Bengal" },
  { displayText: "Howrah", value: "Howrah", state: "West Bengal" },
  { displayText: "North 24 Parganas", value: "North 24 Parganas", state: "West Bengal" },
  { displayText: "South 24 Parganas", value: "South 24 Parganas", state: "West Bengal" },
  
  // Uttar Pradesh Districts (major ones)
  { displayText: "Lucknow", value: "Lucknow", state: "Uttar Pradesh" },
  { displayText: "Gautam Buddha Nagar", value: "Gautam Buddha Nagar", state: "Uttar Pradesh" },
  { displayText: "Ghaziabad", value: "Ghaziabad", state: "Uttar Pradesh" },
  { displayText: "Kanpur Nagar", value: "Kanpur Nagar", state: "Uttar Pradesh" },
  { displayText: "Agra", value: "Agra", state: "Uttar Pradesh" },
  { displayText: "Varanasi", value: "Varanasi", state: "Uttar Pradesh" },
  
  // Delhi
  { displayText: "Central Delhi", value: "Central Delhi", state: "Delhi" },
  { displayText: "New Delhi", value: "New Delhi", state: "Delhi" },
  { displayText: "South Delhi", value: "South Delhi", state: "Delhi" },
  { displayText: "North Delhi", value: "North Delhi", state: "Delhi" },
];

// Default values
export const DEFAULT_STATE = "Kerala";
export const DEFAULT_DISTRICT = "Thrissur";

// Helper function to get districts by state
export const getDistrictsByState = (stateValue: string) => {
  if (!stateValue) return [];
  return DISTRICT_LIST.filter(district => district.state === stateValue);
};

// Helper function to get district display name
export const getDistrictDisplayName = (districtValue: string) => {
  const district = DISTRICT_LIST.find(d => d.value === districtValue);
  return district ? district.displayText : districtValue;
};

// Helper function to get state display name
export const getStateDisplayName = (stateValue: string) => {
  const state = STATE_LIST.find(s => s.value === stateValue);
  return state ? state.displayText : stateValue;
};
