export type WebsocketAction = {
  type: string;
  websocket: any;
};

export const configureWebsockets: () => any;

export const websocketManager: ({ url: string }) => void;

export const addMessageHandler: (handler: any) => void;
