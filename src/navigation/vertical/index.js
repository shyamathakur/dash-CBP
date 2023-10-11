import { Mail, Home } from "react-feather";

export default [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Home size={20} />,
    navLink: "/dashboard",
  },
  {
    id: "branch",
    title: "Branch",
    icon: <Mail size={20} />,
    navLink: "/branch",
  },
  {
    id: "employee",
    title: "Employee",
    icon: <Home size={20} />,
    navLink: "/employee",
  },
  {
    id: "hostFamily",
    title: "HostFamily",
    icon: <Mail size={20} />,
    navLink: "/hostFamily",
  },
  {
    id: "PartTime",
    title: "PartTime",
    icon: <Home size={20} />,
    navLink: "/PartTime",
  },
  {
    id: "studyHoliday",
    title: "StudyHoliday",
    icon: <Mail size={20} />,
    navLink: "/studyHoliday",
  }
];
