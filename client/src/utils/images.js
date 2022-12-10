// // Require the cloudinary library
// require('dotenv').config();
// const cloudinary = require('cloudinary').v2;

// // Return "https" URLs by setting secure: true
// cloudinary.config({
//   secure: true,
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_KEY,
//   api_secret: process.env.CLOUD_SECRET
// });

// // Log the configuration
// console.log(cloudinary.config());


// /////////////////////////
// // Uploads an image file
// /////////////////////////

// const uploadImage = async (imagePath, imageName) => {
//     // Use the uploaded file's name as the asset's public ID and 
//     // allow overwriting the asset with new versions
//     const options = {
//       public_id: imageName,
//       use_filename: false,
//       unique_filename: false,
//       overwrite: true,
      
//     };

//     try {
//       // Upload the image
//       const result = await cloudinary.uploader.upload(imagePath, {public_id: imageName});
//       console.log(result, "uploadImage");
//       return result.public_id;
//     } catch (error) {
//       console.error(error);
//     }
// };
    

// /////////////////////////////////////
// // Gets details of an uploaded image
// /////////////////////////////////////
// const getAssetInfo = async (publicId) => {

//     // Return colors in the response
//     const options = {
//       colors: true,
//     };

//     try {
//         // Get details about the asset
//         const result = await cloudinary.api.resource(publicId, options);
//         console.log(result, "getAssetInfo");
//         return result.colors;
//         } catch (error) {
//         console.error(error);
//     }
// };
   

// //////////////////////////////////////////////////////////////
// // Creates an HTML image tag with a transformation that
// // results in a circular thumbnail crop of the image  
// // focused on the faces, applying an outline of the  
// // first color, and setting a background of the second color.
// //////////////////////////////////////////////////////////////
// const createImageTag = (publicId, ...colors) => {
    
//     // Set the effect color and background color
//     const [effectColor, backgroundColor] = colors;

//     // Create an image tag with transformations applied to the src URL
//     let imageTag = cloudinary.image(publicId, {
//       transformation: [
//         { width: 250, height: 250, gravity: 'faces', crop: 'thumb' },
//         { radius: 'max' },
//         { effect: 'outline:10', color: effectColor },
//         { background: backgroundColor },
//       ],
//     });

//     return imageTag;
// };
   

// //////////////////
// //
// // Main function
// //
// //////////////////

// // (async () => {

// //     // Set the image to upload
// //     const imagePath = 'https://media.discordapp.net/attachments/431289110578331659/1050606308576997438/image.png?width=338&height=475';
// //     let imageName = "tootyfrooty"
// //     // Upload the image
// //     const publicId = await uploadImage(imagePath, imageName);

// //     // Get the colors in the image
// //     const colors = await getAssetInfo(publicId);

// //    // Create an image tag, using two of the colors in a transformation
// //     const imageTag = await createImageTag(publicId, colors[0][0], colors[1][0]);

// //     // Log the image tag to the console
// //     console.log(imageTag, "imageTag");

// // })();
// // const imagePath = 'https://media.discordapp.net/attachments/431289110578331659/1050606308576997438/image.png?width=338&height=475';
// //     let imageName = "tootyfrooty2"
// // uploadImage(imagePath, imageName)
// // cloudinary.v2.uploader
// //     .unsigned_upload("https://media.discordapp.net/attachments/431289110578331659/1050606308576997438/image.png?width=338&height=475", "text_here",
// //         { cloud_name: "websitebuilderv1" })
// //     .then(result => console.log(result));
// // module.exports = uploadImage, getAssetInfo, createImageTag;