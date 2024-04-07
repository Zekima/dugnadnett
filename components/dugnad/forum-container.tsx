import {
  getThreadMessagesByThreadId,
  getThreadsByDugnadid,
} from "@/actions/dugnadActions/threadActions";
import { Dugnad } from "@prisma/client";
import React from "react";
import ThreadCard from "./thread-card";
import { Thread, ThreadMessages } from "@prisma/client";
import { ThreadProps } from "@/types";
import { getCurrentUser } from "@/lib/auth";

async function getThreadProps(dugnadId: number): Promise<ThreadProps[]> {
  const threads: Thread[] = (await getThreadsByDugnadid(dugnadId)) as Thread[];
  const threadProps: ThreadProps[] = [];
  for (let i = 0; i < threads.length; i++) {
    const msgs: ThreadMessages[] = (await getThreadMessagesByThreadId(
      threads[i].id
    )) as ThreadMessages[];
    threadProps.push({ thread: threads[i], msgs: msgs });
  }
  return threadProps;
}

const ForumContainer = async ({ dugnad }: { dugnad: Dugnad }) => {
  if (!dugnad) return;
  const user = await getCurrentUser();
  const threads: ThreadProps[] = await getThreadProps(dugnad.id);
  if (!threads) return;

  return (
    <div>
      <div className="">
        {threads.map((threadProp) => (
          <ThreadCard threadProp={threadProp} user={user} /> // Modified to pass the user prop
        ))}
      </div>
    </div>
  );
};

export default ForumContainer;
