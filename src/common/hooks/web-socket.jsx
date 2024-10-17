import { useEffect, useState } from "react";

/** Hook useWebSocket
 * Hook to manage a WebSocket connection
 * @return {object} message
 */
const useWebSocket = () => {
  /** Init state the hook */
  const [message, setMessage] = useState(null);
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
     * @return setMessage - Set the current message in the state
     */
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // Set the current message to the latest one received
        setMessage(data);
      } catch (error) {
        console.error("Error parsing WebSocket message: ", error);
      }
    };

    /** WebSocket connection closed */
    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    /** Cleanup function to close WebSocket connection */
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [token]);

  return message;
};

export default useWebSocket;
