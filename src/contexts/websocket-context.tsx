import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import { NotificationType } from "@/schemas/notification.schema";
import Stomp, { Frame, Client } from 'stompjs';
import SockJS from 'sockjs-client';
import { useUser } from "./user-context";

interface WebSocketContextSchema {
    notifications: Array<NotificationType>;
    setCallback: (callback: Dispatch<SetStateAction<Array<NotificationType>>>) => void,
    updateReadNotifications: (id: number) => void
}

const WebSocketsContext = createContext<WebSocketContextSchema>({
    notifications: [],
    setCallback: () => {},
    updateReadNotifications: () => {}
});

const WebsocketsContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const username = useUser().state.user?.profile.sub;
    const wsClient = useRef<Client | null>(null);
    const [notifications, setNotifications] = useState<Array<NotificationType>>([]);

    useEffect(() => {
        if (!wsClient.current) {
            connect();
        } // eslint-disable-next-line
    }, [])

    async function connect() {
        const socket = new SockJS(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/ws` || '');
        wsClient.current = Stomp.over(socket);
        wsClient.current.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        console.log("connected");
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

    let setter : Dispatch<SetStateAction<Array<NotificationType>>>;
    
    const setCallback = (callback: Dispatch<SetStateAction<Array<NotificationType>>>) => {
        setter = callback;
    }

    const onPrivateMessageReceived = (message: Stomp.Message) => {
        const newMessage: NotificationType = JSON.parse(message.body);
        notifications.push(newMessage);
        setNotifications(notifications);
        setter(notifications);
    };

    const updateReadNotifications = (id: number) => {
        const result = wsClient.current?.send(
            `/app/notification.read/${id}`
        );
        console.log(result);
    }

    return (<WebSocketsContext.Provider value={{
        notifications,
        setCallback,
        updateReadNotifications
    }}>
        {children}
    </WebSocketsContext.Provider>);
}
export const useWebsockets = () => useContext(WebSocketsContext);

export default WebsocketsContextProvider;