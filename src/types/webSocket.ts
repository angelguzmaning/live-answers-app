import { useEffect, useState } from "react";

export function useWebSocket(url: string): string {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket(url);
    socket.onmessage = ({ data }) => setMessage(data);

    return () => {
      socket.close();
    };
  }, [url]);

  return message;
}
