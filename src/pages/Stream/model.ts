import { useEffect, useState } from "react";

type ClientMessage = [];
type Tag = [string, ...any];

interface Event {
    id: string;
    pubkey: string;
    created_at: number;
    kind: number;
    tags: Tag[];
    content: string;
    sig: string;
}

export default () => {
    const [events, setEvents] = useState<Event[]>([]);

    const connect = () => {
        const socket = new WebSocket("ws://127.0.0.1:9002");
        socket.addEventListener("open", () => console.log("connect relay success!"));
        socket.addEventListener("message", event => {
            console.log(event);
        });
    };

    const send = (msg: ClientMessage) => {};

    const onEvent = () => {};

    useEffect(() => {
        connect();
    }, []);

    return { events, send };
};
