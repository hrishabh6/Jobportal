export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  {
    value: "system",
    label: "System",
    icon: "/assets/icons/computer.svg",
  },
];

export const THEME_NAMES = {
  DARK: "dark",
  LIGHT: "light",
  SYSTEM: "system",
};



export const getTimestamp = (createdAt) => {
  const createdDate = new Date(createdAt); // Ensure it's a Date object
  
  try {
    const now = new Date();
    const timeDifference = now.getTime() - createdDate.getTime();

    // Define time intervals in milliseconds
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day;
    const year = 365 * day;

    if (timeDifference < minute) {
      const seconds = Math.floor(timeDifference / 1000);
      return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
    } else if (timeDifference < hour) {
      const minutes = Math.floor(timeDifference / minute);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (timeDifference < day) {
      const hours = Math.floor(timeDifference / hour);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (timeDifference < week) {
      const days = Math.floor(timeDifference / day);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (timeDifference < month) {
      const weeks = Math.floor(timeDifference / week);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else if (timeDifference < year) {
      const months = Math.floor(timeDifference / month);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
      const years = Math.floor(timeDifference / year);
      return `${years} ${years === 1 ? "year" : "years"} ago`;
    }
  } catch (error) {
    console.log(error)
  }

};

export const GlobalSearchAdminFilter = [
  { name: "Company", value: "company" },
  { name: "Job", value: "job" }
];

export const filters = [
    {
        id: 'salary',
        name: 'Salary',
        options: [
            { value: '0-20000', label: '0 - 20,000', checked: false },
            { value: '20001-40000', label: '20,001 - 40,000', checked: false },
            { value: '40001-60000', label: '40,001 - 60,000', checked: false },
            { value: '60001-80000', label: '60,001 - 80,000', checked: false },
            { value: '80001+', label: '80,001+', checked: false },
        ],
    },
    {
        id: 'location',
        name: 'Location',
        options: [
            { value: 'Delhi', label: 'Delhi', checked: false },
            { value: 'mumbai', label: 'Mumbai', checked: false },
            { value: 'bangalore', label: 'Bangalore', checked: false },
            { value: 'hyderabad', label: 'Hyderabad', checked: false },
            { value: 'chennai', label: 'Chennai', checked: false },
            { value: 'kolkata', label: 'Kolkata', checked: false },
            { value: 'pune', label: 'Pune', checked: false },
            { value: 'ahmedabad', label: 'Ahmedabad', checked: false },
            { value: 'jaipur', label: 'Jaipur', checked: false },
            { value: 'lucknow', label: 'Lucknow', checked: false },
        ],
    },
    {
        id: 'title',
        name: 'Job Title',
        options: [
            { value: 'developer', label: 'Software Developer', checked: false },
            { value: 'data-analyst', label: 'Data Analyst', checked: false },
            { value: 'project-manager', label: 'Project Manager', checked: false },
            { value: 'ui/ux', label: 'UI/UX Designer', checked: false },
            { value: 'digital-marketer', label: 'Digital Marketer', checked: false },
            { value: 'content-writer', label: 'Content Writer', checked: false },
            { value: 'sales-executive', label: 'Sales Executive', checked: false },
            { value: 'human-resources', label: 'Human Resources (HR)', checked: false },
            { value: 'accountant', label: 'Accountant', checked: false },
            { value: 'civil-engineer', label: 'Civil Engineer', checked: false },
            { value: 'mechanical-engineer', label: 'Mechanical Engineer', checked: false },
            { value: 'teacher', label: 'Teacher', checked: false },
            { value: 'nurse', label: 'Nurse', checked: false },
            { value: 'electrician', label: 'Electrician', checked: false },
            { value: 'driver', label: 'Driver', checked: false },
        ],
    },
]

export const sortOptions = [
  { name: 'Newest', href: '#', current: false },
  { name: 'Highest Salary', href: '#', current: false },
  { name: 'Lowest Salary', href: '#', current: false },
  { name: 'Most Applications', href: '#', current: false },
];