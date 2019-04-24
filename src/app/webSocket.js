export let webSocket;

export const configureWebSocket = (onMessage) => {
  webSocket = new WebSocket(`ws://${process.env['HOST'] || '0.0.0.0'}:8080`);
  webSocket.onmessage = onMessage;
  webSocket.onerror = (err) => {
    console.error(err);
    webSocket = null;
  };
  webSocket.onopen = () => {
    console.log("Opened websocket");
  };
};
