export type WebsocketAction = {
  type: string;
  websocket: any;
};

export const websocketManager: ({ url: string }) => void;
