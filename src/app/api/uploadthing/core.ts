import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .onUploadComplete(async ({ file }) => {
      console.log("Upload complete:", file.url);
      return { url: file.url };
    }),
  
  videoUploader: f({ video: { maxFileSize: "64MB", maxFileCount: 3 } })
    .onUploadComplete(async ({ file }) => {
      console.log("Video upload complete:", file.url);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
