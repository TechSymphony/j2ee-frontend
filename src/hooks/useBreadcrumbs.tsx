import { usePathname } from "next/navigation";

export function useBreadcrumbs() {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean); // Loại bỏ các phần tử trống

  const breadcrumbItems = [{ title: "Dashboard", link: "/dashboard" }];

  // Xây dựng mảng breadcrumbs dựa trên các segment của pathname
  let currentLink = "/dashboard";
  pathSegments.forEach((segment, index) => {
    if (index === 0) return; // Bỏ qua "dashboard" vì đã thêm trước

    currentLink += `/${segment}`;

    let title = segment.charAt(0).toUpperCase() + segment.slice(1);

    // Nếu là phần tử cuối cùng và là số, đổi tiêu đề thành "Edit"
    if (index === pathSegments.length - 1) {
      // Nếu phần tử cuối là số (id), đặt title là "Edit", nếu không là "Create"
      if (!isNaN(Number(segment))) {
        title = "Edit";
      } else {
        title = "Create";
      }
    }

    breadcrumbItems.push({ title, link: currentLink });
  });

  return breadcrumbItems;
}
