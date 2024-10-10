import { useEffect, useState } from "react";

const useWebSocket = (url, token) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let ws;
    // Verifica si el token está disponible
    if (!token) {
      console.error("WebSocket connection requires a token.");
      return;
    }

    ws = new WebSocket(`${url}`);

    ws.onopen = () => {
      console.log("WebSocket connection established.");
      // ws.send(JSON.stringify({ token }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [url, token]); // Dependencias incluyen url y token para reconectar si cambian

  return messages;
};

export default useWebSocket;
