import React, { useState } from "react";

interface Message {
  content: string;
  originalarrivaltime: string;
  displayName: string | null;
  from: string;
}

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
              .filter((msg: any) => msg.messagetype === "RichText");
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
      <div>
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <p>
              <strong>{msg.displayName || msg.from || "Unknown"}</strong>:{" "}
              {msg.content}
            </p>
            <small>{new Date(msg.originalarrivaltime).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
