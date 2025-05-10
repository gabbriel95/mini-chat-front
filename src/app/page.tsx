"use client";

import React, { useState } from "react";
import { UserList } from "./components/UserList";
import { ChatComponent } from "./components/ChatComponent";

export default function Home() {
  const [targetUserId, setTargetUserId] = useState<string | null>(null);

  return (
    <div>
      {!targetUserId ? (
        <UserList onSelectUser={(id) => setTargetUserId(id)} />
      ) : (
        <ChatComponent
          targetUserId={targetUserId}
          onBack={() => setTargetUserId(null)}
        />
      )}
    </div>
  );
}
