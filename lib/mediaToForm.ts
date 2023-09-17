import { Photo } from "@/types/User";
import { UploadFile } from "antd";

export const mediaToForm = (id: number) => ({
  fileList: [
    {
      response: [
        {
          id,
        },
      ],
    },
  ],
});

export const mediaToList = (
  media: Photo | undefined
): UploadFile[] | undefined => {
  if (!media) return undefined;
  return [media].map((e) => ({
    uid: e.id.toString(),
    name: e.name,
  }));
};

export const getMediaId = (media: any) =>
  media?.fileList.map((e: any) => {
    return e.response[0].id;
  });
