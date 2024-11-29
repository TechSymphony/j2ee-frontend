import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import { NotificationListResType, NotificationType } from "@/schemas/notification.schema";
import Stomp, { Frame, Client } from 'stompjs';
import SockJS from 'sockjs-client';
import { useUser } from "./user-context";
import { useGetNotificationListQuery } from "@/queries/useNotification";

interface WebSocketContextSchema {
    notifications: Array<NotificationType>;
    updateReadNotifications: (id: number) => void,
    setNotifications: Dispatch<SetStateAction<NotificationListResType>>
}

const WebSocketsContext = createContext<WebSocketContextSchema>({
    notifications: [],
    updateReadNotifications: () => {},
    setNotifications: () => {}
});

const WebsocketsContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const username = useUser().state.user?.profile.sub;
    const wsClient = useRef<Client | null>(null);
    const [notifications, setNotifications] = useState<NotificationListResType>([]);
    const notificationsRef = useRef<NotificationListResType>(notifications);

    useEffect(() => {
        if (!wsClient.current && username) {
            connect();
        } // eslint-disable-next-line
    }, [[], username])

    const { data } = useGetNotificationListQuery(username ?? '');

    useEffect(() => {
        if (data) {
            notificationsRef.current = data.payload;
            setNotifications(notificationsRef.current);
        }
    }, [data]);

    async function connect() {
        const socket = new SockJS(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/ws` || '');
        wsClient.current = Stomp.over(socket);
        wsClient.current.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        if (!wsClient.current) return;
        while (!wsClient.current.connected) { }
        // listen private message
        wsClient.current.subscribe(
            `/specific/${username}/messages`,
            onPrivateMessageReceived
        );
        // listen public message queue
        // wsClient.current.subscribe(
        //     `/public`,
        //     onPublicMessageReceived
        // );

        // wsClient.current.send(
        //     '/app/user.addUser',
        //     {},
        //     JSON.stringify({
        //         id: details?.id,
        //         username: details?.username,
        //         fullName: details?.fullName,
        //     })
        // );
    };

    const onError = (error: string | Frame) => {
        console.log('Error: ', error);
    };

    const onPrivateMessageReceived = (message: Stomp.Message) => {
        const newMessage: NotificationType = JSON.parse(message.body);
        // notificationsRef.current.unshift(newMessage);
        setNotifications([ newMessage, ...notificationsRef.current ]);
        // setter(notificationsRef.current);
    };

    const updateReadNotifications = (id: number) => {
        const result = wsClient.current?.send(
            `/app/notification.read/${id}`
        );
        console.log(result);
    }

    return (<WebSocketsContext.Provider value={{
        notifications,
        updateReadNotifications,
        setNotifications
    }}>
        {children}
    </WebSocketsContext.Provider>);
}
export const useWebsockets = () => useContext(WebSocketsContext);

export default WebsocketsContextProvider;