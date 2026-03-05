import { memoryStorage } from "multer";

export const memoryOptions = {
  storage: memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
};
