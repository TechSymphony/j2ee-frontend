"use client";
import { BellIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useWebsockets } from "@/contexts/websocket-context";
import { NotificationType } from "@/schemas/notification.schema";
import { useEffect, useState } from "react";

function Notifications() {
  const { notifications, setCallback, updateReadNotifications } = useWebsockets();
  const [messages, setMessages] = useState<Array<NotificationType>>([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  
  setCallback(setMessages);

  useEffect(() => {
    console.log(messages.length);
    console.log(notifications.length);
    setMessages(messages);
  }, [messages, notifications]);

  const setNotificationAsRead = () => {
    for(const message of messages) {
      updateReadNotifications(message.id);
    }
    setUnreadNotifications(0);
  }

  return (
    <Popover>
      <PopoverTrigger asChild onClick={setNotificationAsRead}>
        <button className="relative p-2 rounded-full hover:bg-gray-200 focus:outline-none">
          <BellIcon className="w-6 h-6" />
          {messages.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center rounded-full text-white text-xs bg-red-600"
            >
              {messages.length}
            </Badge>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className="p-4 w-72 shadow-lg rounded-lg">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-sm">No new messages</p>
        ) : (
          <ul className="space-y-2">
            {messages.map((message, index) => (
              <li
                key={index}
                className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition"
              >
                {message.message}
              </li>
            ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default Notifications;