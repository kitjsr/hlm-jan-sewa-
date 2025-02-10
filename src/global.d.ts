// src/global.d.ts
declare global {
    interface Navigator {
      app: {
        exitApp: () => void;
      };
    }
  }
  