import React, { useState } from "react";
import "./FileUpload.css"; // Import the CSS file

interface Message {
  content: string;
  originalarrivaltime: string;
  displayName: string | null;
  from: string;
  isCall?: boolean;
  callType?: string;
  duration?: string;
}

// Utility to clean messages (handling call start/ended)
const cleanMessage = (msg: any): Message => {
  let isCall = false;
  let cleanedContent = msg.content;
  let callType = "";
  let duration = "";

  // Check if the message contains call type (started or ended)
  if (cleanedContent.includes('type="started"')) {
    isCall = true;
    callType = "Started";
    // Extract the duration
    const durationMatch = cleanedContent.match(/<duration>([\d\.]+)<\/duration>/);
    duration = durationMatch ? durationMatch[1] : "Unknown";
    cleanedContent = `📞 Call Started: ${msg.displayName || "Unknown"} to Mojo`;  // Clean content for call started
  } else if (cleanedContent.includes('type="ended"')) {
    isCall = true;
    callType = "Ended";
    // Extract the duration
    const durationMatch = cleanedContent.match(/<duration>([\d\.]+)<\/duration>/);
    duration = durationMatch ? durationMatch[1] : "Unknown";
    cleanedContent = `📞 Call Ended: ${msg.displayName || "Unknown"} to Mojo (${duration} minutes)`;  // Clean content for call ended
  }

  return { ...msg, content: cleanedContent, isCall, callType, duration };
};

// Your existing functions
const relevantSenders = process.env.REACT_APP_RELEVANT_SENDERS
  ? process.env.REACT_APP_RELEVANT_SENDERS.split(",")
  : [];

const displayNameKeyword = process.env.REACT_APP_DISPLAY_NAME_KEYWORD || "maija";

const getSenderDetails = (from: string, displayName: string | null) => {
  const name =
    process.env[`REACT_APP_NAME_${from.replace(/:/g, "_")}`] ||
    (displayName && displayName.includes("Maija") ? "Maija" : "Unknown");

  const cssClass = from === "8:traka_mondzole" ? "madara" : "maija";
  return { name, cssClass };
};

const isRelevantMessage = (msg: any): boolean => {
  if (relevantSenders.includes(msg.from)) {
    return true;
  }

  if (msg.displayName && msg.displayName.toLowerCase().includes(displayNameKeyword)) {
    return true;
  }

  return false;
};

const FileUpload = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          if (json && json.conversations) {
            const allMessages: Message[] = json.conversations
              .flatMap((conv: any) => conv.MessageList)
              .filter(isRelevantMessage)
              .map(cleanMessage); // Clean and check for call start/ended here

            setMessages(allMessages);
            setError(null);
          } else {
            setError("Uploaded file is not a valid JSON structure.");
          }
        } catch (err) {
          setError("Error parsing JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <h2>Upload Your JSON File</h2>
      <input
        type="file"
        accept="application/json"
        onChange={handleFileUpload}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="chat-container">
        {messages.length === 0 ? (
          <p>No relevant messages found.</p>
        ) : (
          messages.map((msg, index) => {
            const { name, cssClass } = getSenderDetails(msg.from, msg.displayName);
            return (
              <div key={index} className={`message message-${cssClass}`}>
                <p>
                  <strong>{name}</strong>: {msg.content} {/* Display only cleaned content */}
                </p>
                <small>{new Date(msg.originalarrivaltime).toLocaleString()}</small>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FileUpload;
