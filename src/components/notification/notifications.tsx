"use client";
import { BellIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useWebsockets } from "@/contexts/websocket-context";
import { NotificationType } from "@/schemas/notification.schema";
import { useEffect, useState } from "react";
import {  useUpdateNotificationAsRead } from "@/queries/useNotification";

function Notifications() {
  const { notifications } =
    useWebsockets();
  const [messages, setMessages] = useState<Array<NotificationType>>([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const updateNotificationAsRead = useUpdateNotificationAsRead();

  useEffect(() => {
    setMessages(notifications);
    for(const message of notifications) {
      if (message.read === false) {
        setUnreadNotifications(unreadNotifications + 1);
      }
    }
  }, [notifications]);

  const setNotificationAsRead = () => {
    for (const message of notifications) {
      if (message.read === false) {
        updateNotificationAsRead.mutate(message.id);
      }
    }
    setUnreadNotifications(0);
  };

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
              {unreadNotifications}
            </Badge>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className="p-4 w-96 shadow-lg rounded-lg max-h-56 overflow-y-scroll">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-sm">Không có thông báo mới</p>
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
