import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import close from "../../assets/icons/close-blue.svg";

const FileLib = () => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFiles = (e) => {
    let file = e.target.files;
    const updatedFiles = [];

    for (let i = 0; i < file.length; i++) {
      const fileWithId = {
        id: uuidv4(),
        file: file[i],
      };

      updatedFiles.push(fileWithId);
    }

    setFiles([...files, ...updatedFiles]);
  };

  useEffect(() => {
    const selectedFiles = [];

    if (files.length > 0) {
      files.map((file) => {
        if (file.url) {
          selectedFiles.push(file);
        } else {
          selectedFiles.push({
            id: file.id,
            url: URL.createObjectURL(file.file),
          });
        }
      });
      setPreviews(selectedFiles);
    }
  }, [files]);

  // TODO
  // useEffect(() => {
  //   if (getImages.length > 0) {
  //     setFiles([...files, ...getImages]);
  //   }
  // }, [getImages]);

  const deleteImage = (id) => {
    setFiles(files.filter((file) => file.id !== id));
    setPreviews(previews.filter((preview) => preview.id !== id));
  };
  // TODO
  // useEffect(() => {
  //   getAllImages(files);
  // }, [files]);

  return (
    <>
      <div className="flex flex-col col-span-1">
        <label htmlFor="banner">Add Pet Images</label>
        <div className="upload-btn-wrapper rounded-md">
          <button className="bg-custom-gray py-3  w-full mt-1">
            Browse Images
          </button>

          <input
            className="file-upload-input"
            type="file"
            name="file"
            multiple
            onChange={handleFiles}
          />
        </div>
      </div>
      <div className="flex flex-wrap col-span-2 gap-5 ">
        {previews &&
          previews.map((item) => {
            return (
              <div className="relative">
                <img
                  className="w-20 h-20 mt-4 border rounded-md object-cover"
                  key={item.id}
                  src={item.url ? item.url : item}
                  alt=""
                />
                <img
                  onClick={() => deleteImage(item.id)}
                  className="bg-primary-blue rounded-full h-6 w-6 absolute top-2 -right-3 cursor-pointer hover:scale-105"
                  src={close}
                  alt="close button"
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default FileLib;
