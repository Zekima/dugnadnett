'use client'

import React from "react";
import { useState } from "react";
import UserImage from "../user-image";
import { Check, X } from 'lucide-react'


const DeltakereNavigation = ({ isOwner, participants, joinRequests, declineRequest, acceptRequest }: any) => {

    const [activeTab, setActiveTab] = useState('participants');

    return (
        <>
            <div>
                <div className="flex gap-2 text-sm text-gray-600 mb-3 mt-3 font-medium">
                    <p
                        onClick={() => setActiveTab('participants')}
                        className={`hover:text-black cursor-pointer ${activeTab === 'participants' ? 'underline text-black' : ''}`}
                    >
                        Deltakere ({participants.length})
                    </p>
                    {isOwner && (
                        <p
                            onClick={() => setActiveTab('requests')}
                            className={`hover:text-black cursor-pointer ${activeTab === 'requests' ? 'underline text-black' : ''}`}
                        >
                            Forespørsler ({joinRequests?.length})
                        </p>
                    )}
                </div>

                <div className="gap-2 flex flex-col">
                    {
                        activeTab === 'participants' && participants.map((participant: any) => (
                            <ParticipantItem
                                key={participant.id}
                                participant={participant}
                            />
                        ))
                    }
                    {activeTab === 'requests' && joinRequests?.map((request: any) => (
                        <RequestItem
                            key={request.id}
                            request={request}
                            declineRequest={declineRequest}
                            acceptRequest={acceptRequest}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}


export default DeltakereNavigation


const ParticipantItem = ({ participant }: any) => (
    <div className="p-2 bg-gray-200 rounded-md flex gap-2">
        <div className="flex gap-2 items-center">
            <UserImage user={participant} size={36} />
            {participant.name}
        </div>
    </div>
);

const RequestItem = ({ request, declineRequest, acceptRequest }: any) => {

    return (
        <div className="p-2 bg-gray-200 rounded-md flex gap-2 justify-between">
            <div className="flex gap-2 items-center">
                <UserImage user={request} size={36} />
                {request.name}
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => acceptRequest(request.participationId)}
                    className="h-full w-12 border-green-800 rounded-md border-2 text-green-800 flex justify-center items-center hover:border-green-600 hover:text-green-600">
                    <Check />
                </button>
                <button
                    onClick={() => declineRequest(request.participationId)}
                    className="h-full w-12 border-red-800 rounded-md border-2 text-red-800 flex justify-center items-center hover:border-red-600 hover:text-red-600">
                    <X />
                </button>
            </div>
        </div>
    );
}
