const File = require("../models/file");
const cloudinary = require("cloudinary").v2;

// local file upload handler function
exports.localFileUpload = async (req, res) => {
  try {
    // fetch the file
    const file = req.files.file;
    console.log("file", file);

    //       = CURRENT DIR  +  PATH +  NAME  +   EXTENSION
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    file.mv(path, (err) => {
      console.log(err);
    });

    res.json({
      success: true,
      msg: "local file uploaded",
    });
  } catch (error) {
    console.log(error);
  }
};

// Function to check if the file extension is valid
const checkExtension = (allowedExtensions, extension) => {
  return allowedExtensions.includes(extension);
};

async function uploadFileCloudinary(file, folder , quality) {
  const options = { folder };
  if(quality){
    options.quality = quality;
  }
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}
exports.imageUpload = async (req, res) => {
  try {
    const { name, email, tags } = req.body;
    const file = req.files.file;
    console.log(file);

    const extension = file.name.split(".")[1].toLowerCase(); // Fix: Add parentheses to toLowerCase()
    const allowedExtensions = ["jpeg", "jpg", "png"];
    const isValidExtension = checkExtension(allowedExtensions, extension);

    if (!isValidExtension) {
      return res.status(400).json({ msg: "File format is not supported" });
    }

    console.log("extension is vaiid ");

    const response = await uploadFileCloudinary(file, "codeHelp");
    console.log(response);

    const filedata = await File.create({
      name,
      email,
      imageUrl: response.secure_url, // Extract 'secure_url' from the Cloudinary response
      tags,
    });
    console.log(filedata);
    return res.status(200).json({ msg: "File uploaded successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal server error while uploading", error });
  }
};

exports.videoUpload = async (req, res) => {
  try {
    const { name, email, tags } = req.body;
    const file = req.files.file;
    console.log(file);

    const extension = file.name.split(".")[1].toLowerCase(); // Fix: Add parentheses to toLowerCase()
    const allowedExtensions = ["mov", "mp4"];
    const isValidExtension = checkExtension(allowedExtensions, extension);

    if (!isValidExtension) {
      return res.status(400).json({ msg: "File format is not supported" });
    }

    console.log("extension is vaiid ");

    const response = await uploadFileCloudinary(file, "codeHelp");
    console.log(response);

    const filedata = await File.create({
      name,
      email,
      imageUrl: response.secure_url, // Extract 'secure_url' from the Cloudinary response
      tags,
    });
    console.log(filedata);
    return res.status(200).json({ msg: "File uploaded successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal server error while uploading", error });
  }
};

function checkExt(extension, allowedextension) {
  return allowedextension.includes(extension);
}
exports.imagereducer = async (req, res) => {
  try {
    const { name, email, tags } = req.body;

    const file = req.files.file;

    // validation
    const allowedextension = ["jpg", "jpeg", "png"];
    const extension = file.name.split(".")[1].toLowerCase();

    const resultex = checkExt(extension, allowedextension);
    if (!resultex) {
      return res.status(400).json({ msg: "wrong file format" });
    }

    const response = await uploadFileCloudinary(file, "codeHelp", 30);
    console.log(response);

    const filedata = await File.create({
      name,
      email,
      imageUrl: response.secure_url,
      tags,
    });
    console.log(filedata);
    return res.status(200).json({ msg: "File uploaded successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal server error while uploading", error });
  }
};
