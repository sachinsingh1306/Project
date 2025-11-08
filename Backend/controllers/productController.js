import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";



// ✅ Function to add a new product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;


    let parsedSizes = [];
    try {
      parsedSizes = JSON.parse(sizes);
    } catch {
      parsedSizes = [];
    }


    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    console.log(
      name,
      description,
      price,
      image,
      category,
      subCategory,
      sizes,
      bestseller
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: parsedSizes(sizes),
      bestseller: bestseller === "true" ? true : false,
      image: imagesUrl,
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ sucess: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

// ✅ Function to list all products
const listProducts = async (req, res) => {};

// ✅ Function to remove a product by ID
const removeProduct = async (req, res) => {};

// ✅ Function to get single product info by ID
const singleProduct = async (req, res) => {};

export { addProduct, listProducts, removeProduct, singleProduct };
