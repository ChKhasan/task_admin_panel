import axios from 'axios';
import React, { useState } from 'react'
import { TOKEN } from '../const/Api';

const useUploadImg = () => {
    const [imageId, setImageId] = useState("");
    let formData = new FormData();
    const [fileList, setFileList] = useState([]);

    const onChange = ({ fileList: newFileList }) => {
      setFileList(newFileList);
      formData.append("file", newFileList[newFileList.length - 1].originFileObj);
      formData.append("type", "img");
  
      axios
        .post("https://coursesnodejs.herokuapp.com/employee/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
          },
        })
        .then((resp) => {
          setImageId(resp.data.data);
        });
    };
  return [imageId,fileList,onChange]
}

export default useUploadImg