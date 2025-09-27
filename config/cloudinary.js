const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret, // Replace with your actual API secret
})

const uploadFiles = async(filePath)=>{
    const data = await cloudinary.uploader.upload(filePath, {folder:"e-commerce-products", resource_type:"raw"}).catch((error) => {
           console.log(error);
       });
    return data
}

module.exports ={uploadFiles}