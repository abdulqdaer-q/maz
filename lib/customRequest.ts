import { axios } from "@/utils/axios";
import { message } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { uploadKey } from "./message-keys";

export const customRequest = (options: any) => {
  const fd = new FormData();
  fd.append("files", options.file);
  axios
    .post("/upload", fd)
    .then((e) => {
      options!.onSuccess!(e.data);
    })
    .catch((err) => {
      options.onError!({
        status: 400,
        name: "error",
        method: "POST",
        url: "/upload",
        message: "upload failed",
      });
    });
};

export const onChange = (info: UploadChangeParam<UploadFile<any>>) => {
  if (info.file.status === "uploading") {
    message.open({
      type: "loading",
      content: `Attempting to Upload ${info.file.name}`,
      key: uploadKey,
    });
  }
  if (info.file.status === "done") {
    message.open({
      type: "success",
      content: `${info.file.name} file uploaded successfully`,
      key: uploadKey,
    });
  } else if (info.file.status === "error") {
    message.open({
      type: "error",
      content: `${info.file.name} file upload failed.`,
      key: uploadKey,
    });
  }
};
