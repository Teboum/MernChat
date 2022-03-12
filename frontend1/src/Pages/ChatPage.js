import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../Context/CharProvider";
import { Box } from "@chakra-ui/layout";
import SideDrawer from "../Component/misellaneous/SideDrawer";
import MyChats from "../Component/MyChats";
import ChatBox from "../Component/ChatBox";

function ChatPage() {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState();
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
}

export default ChatPage;
