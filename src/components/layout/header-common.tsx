
import DarkModeToggle from "../dark-mode-toggle";
import { UserNav } from "./user-nav";

// for header component common in admin and client
export default function HeaderCommon() {
  return (
    <div className="flex items-center gap-2 justify-end">
        <UserNav />
        <DarkModeToggle />
    </div>
  );
}
