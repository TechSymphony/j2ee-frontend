
import DarkModeToggle from "../dark-mode-toggle";
import Notifications from "../notification/notifications";
import { UserNav } from "./user-nav";

// for header component common in admin and client
export default function HeaderCommon() {
    return (
        <div className="flex items-center gap-2 justify-end">
            <Notifications notifications />
            <UserNav />
            <DarkModeToggle />
        </div>
    );
}