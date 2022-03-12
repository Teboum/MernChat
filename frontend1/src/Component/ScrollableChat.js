import { Avatar, Tooltip } from "@chakra-ui/react";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender } from "../config/ChatLogics";
import { ChatState } from "../Context/CharProvider";
import "./styles.css";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  console.log(user, messages);
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => {
          console.log(m.sender._id, user._id);
          return (
            <div
              key={i}
              style={{
                display: "flex",
              }}
              className={m.sender._id === user._id ? "message" : null}
            >
              {isSameSender(messages, m, i, user._id) ||
                (isLastMessage(messages, i, user._id) && (
                  <Tooltip
                    label={m.sender.name}
                    placement="bottom-start"
                    hasArrow
                  >
                    <Avatar
                      mt="7px"
                      mr={1}
                      size="sm"
                      cursor="pointer"
                      name={m.sender.name}
                      src={m.sender.pic}
                    />
                  </Tooltip>
                ))}
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75",
                  marginTop:
                    messages[i - 1] &&
                    messages[i - 1].sender._id === m.sender._id
                      ? "3px"
                      : "10px",
                }}
                className="span-message"
              >
                {m.content}
              </span>
            </div>
          );
        })}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
