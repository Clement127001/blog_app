import { Book, LogInIcon, Plus, User } from "lucide-react";

export const publicNavItems = [
  {
    Icon: LogInIcon,
    to: "/login",
    label: "login",
  },
  {
    Icon: User,
    to: "/register",
    label: "register",
  },
];

export const loggedUserNavItems = [
  {
    Icon: Book,
    to: "/blogs",
    label: "all blogs",
  },
  {
    Icon: Plus,
    to: "/blogs/create",
    label: "create new blog",
  },
];
