import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "../../redux/slices/alert-slice";
import { fetchSpaces } from "@/redux/slices/clickFZT/spaces-slices";

/** Hook useWebSocket
 * Hook to manage a WebSocket connection
 * @return {object} message
 */
const useWebSocket = () => {
  /** Init state the hook */
  const token = localStorage.getItem("token-advisor");
  const advisorLogin = JSON.parse(localStorage.getItem("advisor"));
  const dispatch = useDispatch();

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
    // ws = new WebSocket("http://192.168.1.197/ws");
    ws = new WebSocket("http://52.200.125.6/ws");

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
        if (data.advisor_id === advisorLogin.id) {
          dispatch(setAlert(data));
        }
        dispatch(fetchSpaces(advisorLogin.id));
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
  }, [token, dispatch, advisorLogin.id]);

  return null;
};

export default useWebSocket;
