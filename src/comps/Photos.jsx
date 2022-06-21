import React, { useState } from 'react'
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { Content } from 'antd/lib/layout/layout';
import { postData } from '../server/common';
import { TOKEN } from '../const/Api';
import axios from 'axios';



const Photos = () => { 
  const [fileList, setFileList] = useState([
  
]);
const [imageUrl,setImageUrl] = useState({})
let formData = new FormData()
const onChange = ({ fileList: newFileList }) => {
  setFileList(newFileList);
  console.log(newFileList[newFileList.length - 1].originFileObj);
  formData.append('file',newFileList[newFileList.length - 1].originFileObj);
  console.log(formData);
  axios.post("https://portfolio-bakcend.herokuapp.com/api/v1/upload",formData,{
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem(TOKEN)}`
    }
  }).then((resp) => {
    console.log(resp);

    axios.get(`https://portfolio-bakcend.herokuapp.com/uploads/${resp.data.data._id}.png`, {responseType: 'blob'}).then((response) => {
      let imageNode = document.getElementById('image');
      let imgUrl = URL.createObjectURL(response.data)
      imageNode.src = imgUrl
      setImageUrl(imageUrl)
    })
  })
};

// const onPreview = async (file) => {
//   let src = file.url;

//   if (!src) {
//     src = await new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file.originFileObj);

//       reader.onload = () => resolve(reader.result);
//     });
//   }

//   const image = new Image();
//   image.src = src;
//   const imgWindow = window.open(src);
//   imgWindow?.document.write(image.outerHTML);
// };
  return (
    <div className="content-body">
    <div className="content-title">
        <h3>Photos</h3>
    </div>
  <Content
    className="site-layout-background"
    style={{
      margin: "24px 16px",
      padding: 24,
      minHeight: 280,
    }}
  >
    Content
    <ImgCrop rotate>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        beforeUpload={() => false}
        maxCount={1}
        // onPreview={onPreview}
      >
        {fileList.length < 5 && '+ Upload'}
      </Upload>
    </ImgCrop>
    <img src="" id='image' alt="" />

  </Content>
</div>
  )
}

export default Photos