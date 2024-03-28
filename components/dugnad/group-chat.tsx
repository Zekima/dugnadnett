'use client'
import React, { useEffect, useState, useRef } from "react";
import { SendHorizontal, Loader2, ArrowDown } from 'lucide-react';
import { io, Socket } from "socket.io-client";
import { IncomingMessage } from "@/types";
import { useDebouncedCallback } from "use-debounce";

interface GroupChatProps {
    userId?: string;
    dugnadId?: number;
    fetchDugnadMessages: any;
}

const GroupChat = ({ userId, dugnadId, fetchDugnadMessages }: GroupChatProps) => {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [hasNewMessages, setHasNewMessages] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<IncomingMessage[]>([]);
    const [input, setInput] = useState<string>('');
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);

    const loadMessages = async () => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);
        const prevScrollTop = messagesContainerRef.current?.scrollHeight || 0;
        try {
            const newMessages = await fetchDugnadMessages(page);
            if (newMessages.length < 25) {
                setHasMore(false);
            }
            setMessages((prevMessages) => [...newMessages.reverse(), ...prevMessages]);
            setPage((prevPage) => prevPage + 1);
            setTimeout(() => {
                messagesContainerRef.current?.scrollTo({
                    top: page === 1 ? messagesContainerRef.current?.scrollHeight : messagesContainerRef.current?.scrollHeight - prevScrollTop
                });
            }, 20);
        } catch (error) {
            console.error("Kan ikke laste inn meldinger:", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        const currentSocket = io(process.env.NODE_ENV === 'production' ? "wss://dugnadnett.no:5000/" : "http://localhost:5000");
        setSocket(currentSocket);
        if (dugnadId) {
            currentSocket.emit("joinRoom", { dugnadId });
        }
        currentSocket.on("receiveMessage", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
            setHasNewMessages(true);
        });

        loadMessages();

        return () => {
            currentSocket.close();
        };
    }, [dugnadId]);

    const sendMessage = () => {
        if (socket && input.trim() !== '') {
            const messageData = {
                message: input,
                ownerId: userId,
                dugnadId: dugnadId ?? 0,
            };
            socket.emit("newMessage", messageData);
            setInput('');
        }
    };

    const handleScroll = useDebouncedCallback((e: any) => {
        if (!e.currentTarget) return;
        const { scrollTop } = e?.currentTarget;
        if (scrollTop === 0 && hasMore && !isLoading) {
            loadMessages();
        }
    }, 300);

    const scrollToBottom = () => {
        const messagesContainer = messagesContainerRef.current;
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            setHasNewMessages(false);
        }
    };

    const isUserAtBottom = () => {
        const messagesContainer = messagesContainerRef.current as HTMLDivElement || 0;
        const { scrollTop, clientHeight, scrollHeight } = messagesContainer;
        setIsAtBottom(scrollHeight - scrollTop - clientHeight < 20)
    };

    useEffect(() => {
        if (hasNewMessages && isAtBottom) {
            scrollToBottom();
        }
    }, [hasNewMessages])

    return (
        <div className="bg-gray-200 py-4 p-3 relative rounded-md">
            {hasNewMessages && !isAtBottom && (
                <div
                    className="absolute bottom-20 w-[200px] bg-white border h-16 w-auto p-4 gap-3 z-50 rounded-3xl flex justify-center items-center cursor-pointer"
                    onClick={scrollToBottom}
                >
                    <p>Nye meldinger</p>
                    <ArrowDown />
                </div>
            )}

            <div ref={messagesContainerRef} onScrollCapture={handleScroll} className="h-[400px] overflow-scroll overflow-x-hidden flex flex-col gap-2" onScroll={() => {
                if (messagesContainerRef.current?.scrollTop === 0 && hasMore && !isLoading) {
                    loadMessages();
                }
                isUserAtBottom();
            }}>
                {messages.map((message, index) => (
                    <div key={index}>
                        {message.ownerId === userId ?
                            <div className="flex flex-col items-end">
                                <div className={`rounded-md p-2.5 w-fit max-w-[70%] bg-black text-white`}>
                                    <p>{message.message}</p>
                                </div>
                            </div> : <>
                                <p className="text-xs mb-1">{message.username}</p>

                                <div className={`rounded-md p-2.5 w-fit max-w-[70%] bg-green-400`}>
                                    <div className="flex flex-col">
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            </>
                        }

                    </div>

                ))}
                {isLoading && <div className="w-full h-1/6 flex justify-center items-center"><Loader2 className="animate-spin" /></div>}
            </div>
            <div className="relative mt-3">
                <textarea
                    className="w-full p-2 rounded-md border-gray-400 border pr-10 resize-none overflow-hidden"
                    placeholder="Skriv melding"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    rows={1}
                    style={{ height: 'auto', minHeight: '35px' }}
                    ref={(textarea) => {
                        if (textarea) {
                            textarea.style.height = 'auto';
                            textarea.style.height = `${textarea.scrollHeight}px`;
                        }
                    }}
                />
                <button
                    className={`absolute right-3 top-1/2 -translate-y-[60%] ${input.trim() ? 'text-gray-800' : 'text-gray-400 cursor-default'}`}
                    onClick={sendMessage}
                >
                    <SendHorizontal />
                </button>
            </div>
        </div>
    );
};

export default GroupChat;