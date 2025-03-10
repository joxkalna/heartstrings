import React, { useState } from "react";
import "./FileUpload.css"; // Import the CSS file

interface Message {
  content: string;
  originalarrivaltime: string;
  displayName: string | null;
  from: string;
}

// Log all environment variables
console.log('All environment variables:', process.env);

const relevantSenders = process.env.REACT_APP_RELEVANT_SENDERS
  ? process.env.REACT_APP_RELEVANT_SENDERS.split(",")
  : [];
console.log("Relevant Senders:", relevantSenders);

const displayNameKeyword = process.env.REACT_APP_DISPLAY_NAME_KEYWORD || "maija";

console.log('Display Name Keyword from .env:', displayNameKeyword);

const getSenderDetails = (from: string, displayName: string | null) => {
  const senderEnvVariable = process.env[`REACT_APP_NAME_${from.replace(/:/g, "_")}`];
  console.log(`Accessing sender name for ${from}: ${senderEnvVariable}`);
  
  const name =
    senderEnvVariable ||
    (displayName && displayName.includes("Maija") ? "Maija" : "Unknown");
  console.log(`Fetched name for ${from}: ${name}`);

  const cssClass = from === "8:traka_mondzole" ? "madara" : "maija";
  return { name, cssClass };
};

const isRelevantMessage = (msg: any): boolean => {
  // Include messages from specific senders
  if (relevantSenders.includes(msg.from)) {
    console.log("Relevant sender:", msg.from);
    return true;
  }

  // Include messages where the displayName contains the keyword from .env
  if (msg.displayName && msg.displayName.toLowerCase().includes(displayNameKeyword)) {
    return true;
  }

  return false;
};

const FileUpload = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Relevant senders:', relevantSenders);
    console.log('Display name keyword:', displayNameKeyword);

    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          console.log("Parsed JSON structure:", json);

          if (json && json.conversations) {
            const allMessages: Message[] = json.conversations
              .flatMap((conv: any) => conv.MessageList)
              .filter(isRelevantMessage); // Use the updated filter function here
            setMessages(allMessages);
            console.log("Filtered Messages:", allMessages);
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
      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>
          <strong>Error:</strong> {error} <br />
          Please ensure the JSON file matches the expected structure.
        </div>
      )}

      <div className="chat-container">
        {messages.length === 0 ? (
          <p>No relevant messages found.</p>
        ) : (
          messages.map((msg, index) => {
            const { name, cssClass } = getSenderDetails(msg.from, msg.displayName);
            return (
              <div key={index} className={`message message-${cssClass}`}>
                <p>
                  <strong>{name}</strong>: {msg.content}
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
