"use client";
import React, { useState, useEffect } from "react";
import { Thread, ThreadMessages } from "@prisma/client";
import ThreadAnswersCard from "./threadAnswers-card";
import { ThreadProps, User } from "@/types";
import { sendThreadMessage } from "@/actions/dugnadActions/threadActions";

const ThreadCard = ({ threadProp, user }: { threadProp: ThreadProps , user: any }) => {
if (!threadProp) return null;
const [extend, setExtend] = useState(false);
const [inputText, setInputText] = useState("");
const [msgs, setMsgs] = useState<ThreadMessages[]>([]); // Update the type to an empty array initially

function handleExtend() {
    setExtend(!extend);
}

function handleSend() {
    sendThreadMessage(inputText, threadProp.thread.id, user.id);
    setInputText(""); 

    setMsgs([...msgs, { id: 300, text: inputText, userId: user.id, threadId: threadProp.thread.id }]);
}

return (
    <div>
        <div>{threadProp.thread.title}</div>
        <div>
            <button className="bg-green-200" onClick={handleExtend}>
                {!extend ? "⋁" : "⋀"}
            </button>
        </div>
        <div>

            {extend && threadProp.msgs && threadProp.msgs.map((msg) => (
                    <div>
                        <div>{msg.userId}</div>
                        <div>{msg.text}</div>
                    </div>
                ))}
            <div>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <button className="bg-green-200" onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
        </div>
    );
};

export default ThreadCard;
