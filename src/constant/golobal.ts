const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const genders = ["Male", "Female", "Other"];

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const monthOption = months.map((month) => ({
  label: month,
  value: month,
}));

export const genderOptions = genders.map((gender) => ({
  label: gender,
  value: gender.toLowerCase(),
}));

export const bloodGroupsOptions = bloodGroups.map((bloodGroup) => ({
  label: bloodGroup,
  value: bloodGroup,
}));

export const weekDaysOptions = weekdays.map((item) => ({
  value: item.toLowerCase(),
  label: item,
}));
