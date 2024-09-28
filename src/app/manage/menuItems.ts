import { Home, LineChart, ShoppingCart, Users2 } from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    Icon: Home,
    href: "/manage/dashboard",
  },
  {
    title: "Đơn hàng",
    Icon: ShoppingCart,
    href: "/manage/orders",
  },
  {
    title: "Phân tích",
    Icon: LineChart,
    href: "/manage/analytics",
  },
  {
    title: "Vai trò",
    Icon: Users2,
    href: "/manage/roles",
  },
];

export default menuItems;
