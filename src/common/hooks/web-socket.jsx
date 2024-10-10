import { useEffect, useState } from "react";

/** Hook useWebSocket
 * Hook to manage a WebSocket connection
 * @return {array} messages
 */
const useWebSocket = () => {
  /** Init state the hook */
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("token-advisor");

  /** UseEffect to manage the WebSocket connection
   * @param {string} token - Token to connect to the WebSocket
   */
  useEffect(() => {
    let ws;

    /** Check if the token exists */
    if (!token) {
      console.error("WebSocket connection requires a token.");
      return;
    }

    /** Create the WebSocket connection
     * @param {string} url - URL to connect to the WebSocket
     */
    ws = new WebSocket("http://192.168.1.197/ws");

    /** WebSocket open connection */
    ws.onopen = () => {
      console.log("WebSocket connection established.");
      // ws.send(JSON.stringify({ token }));
    };

    /** WebSocket message received
     * @param {object} event - Event object with the data received
     * @param {string} event.data - Data received from the WebSocket
     * @return setMessages - Set the messages in the state
     */
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    /** WebSocket connection closed */
    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [token]);
  return messages;
};

export default useWebSocket;
