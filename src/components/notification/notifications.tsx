import { BellIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Stomp, { Client } from "stompjs";
import SockJS from "sockjs-client";
import { NotificationType } from '../../schemas/notification.schema';
import { useState } from "react";
import { useUser } from "@/contexts/user-context";

function Notifications() {

  const [notifications, setNotification] = useState<NotificationType[]>([]);
  const username = useUser().state.user?.profile.sub;

  const socket = new SockJS("https://localhost:8080/ws")
  const privateStompClient = Stomp.over(socket);

  privateStompClient.connect({}, function (frame) {
    console.log(frame);
    privateStompClient.subscribe(`/specific/${username}/messages`, onMessageReceived);
  })

  const onMessageReceived = (message: Stomp.Message) => {
    const newMessage: NotificationType = JSON.parse(message.body);
    notifications.push(newMessage);
    setNotification(notifications);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-gray-200 focus:outline-none">
          <BellIcon className="w-6 h-6" />
          {notifications.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center rounded-full text-white text-xs bg-red-600"
            >
              {notifications.length}
            </Badge>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className="p-4 w-72 shadow-lg rounded-lg">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-sm">No new notifications</p>
        ) : (
          <ul className="space-y-2">
            {notifications.map((notification, index) => (
              <li
                key={index}
                className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition"
              >
                {notification.message}
              </li>
            ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default Notifications;