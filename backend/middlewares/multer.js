import multer from "multer";

const storage = multer.memoryStorage();

// Configuration for single file upload
export const singleUpload = multer({ storage }).single("profile");

// Configuration for multiple file uploads (resume and pfp)
export const multipleUpload = multer({ storage }).fields([
  { name: "profile", maxCount: 1 }, // For profile picture
  { name: "resume", maxCount: 1 },  // For resume
]);
