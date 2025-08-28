import { BellIcon, CalendarIcon, SettingsIcon } from "@chakra-ui/icons";

export const sideBarMenu = [
  { icon: <BellIcon size={18} />, name: "Dashboard", route: "/" },
  { icon: <CalendarIcon size={18} />, name: "Report", route: "/report" },
  { icon: <SettingsIcon size={18} />, name: "Master Gerbang", route: "/gate" },
];
