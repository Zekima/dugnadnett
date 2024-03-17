'use client'

import React, { useEffect, useState, useRef } from "react";
import { SendHorizontal } from 'lucide-react';
import { io, Socket } from "socket.io-client";
import { User, IncomingMessage } from "@/types";

interface GroupChatProps {
    userId?: string;
    dugnadId?: number;
}

const GroupChat = ({ userId, dugnadId }: GroupChatProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<IncomingMessage[]>([]);
    const [input, setInput] = useState<string>('');

    useEffect(() => {
        const currentSocket = io(process.env.NODE_ENV === 'production' ? "https://dugnadnett.no/ws" : "http://localhost:5000");
        setSocket(currentSocket);
        return () => { currentSocket.close(); }
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("receiveMessage", (data) => {
                console.log(data.message, data.ownerId);
                setMessages((prevMessages) => [...prevMessages, data]);
            });
        }
    }, [socket]);

    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const messagesContainer = messagesContainerRef.current;
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }, [messages]);

    const sendMessage = () => {
        if (socket) {
            const messageData = {
                message: input,
                ownerId: userId,
                dugnadId: dugnadId ?? 0,
            };
            socket.emit("newMessage", messageData);
            setInput('');
        }
    };

    return (
        <div>
            <div ref={messagesContainerRef} className="max-h-[444px] overflow-scroll overflow-x-hidden">
                {messages.map((message, index) => (
                    <div key={index} className={`my-1 rounded-md p-1.5 ${message.ownerId === userId ? "bg-green-300" : "bg-gray-200"}`}>
                        <div className="flex flex-col">
                            <p className="text-xs">{message.username}</p>
                            <p>{message.message}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="relative">
                <input type="text" className="w-full p-2 rounded-md border-gray-400 border" placeholder="Skriv melding" value={input} onChange={(e) => setInput(e.target.value)} />
                <button className={`absolute right-4 top-2 ${input ? "text-gray-800" : "text-gray-400"}`} onClick={sendMessage}><SendHorizontal /></button>
            </div>
        </div>
    );
};

export default GroupChat;
