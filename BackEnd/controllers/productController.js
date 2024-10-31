const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");

const ProductController = {
  getAllProducts: async (req, res) => {
    try {
      const product = await Product.find().populate("categoryproductid");
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(product);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate(
        "categoryproductid"
      );
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  addProduct: async (req, res) => {
    try {
      console.log(req.filename);
      const newProduct = new Product({
        categoryproductid: req.body.categoryproductid,
        name: req.body.name,
        price: req.body.price,
        image: req.file.filename,
        describe: req.body.describe,
        status: req.body.status,
      });

      await newProduct.save();
      res.status(200).json("Add successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateProduct: async (req, res) => {
    try {
      if (req.body.changpicture == 0) {
        const updateProduct = {
          categoryproductid: req.body.categoryproductid,
          name: req.body.name,
          price: req.body.price,
          image: req.body.image,
          describe: req.body.describe,
          status: req.body.status,
        };
        const product = await Product.findByIdAndUpdate(
          req.params.id,
          updateProduct,
          {
            new: true,
          }
        );
        if (!product) {
          return res.status(404).json("Wrong updateProduct!");
        }
        res.status(200).json(product);
      } else {
        const updateProduct = {
          categoryproductid: req.body.categoryproductid,
          name: req.body.name,
          price: req.body.price,
          image: req.file.filename,
          describe: req.body.describe,
          status: req.body.status,
        };
        const product = await Product.findByIdAndUpdate(
          req.params.id,
          updateProduct,
          {
            new: true,
          }
        );
        if (!product) {
          return res.status(404).json("Wrong updateProduct!");
        }
        res.status(200).json(product);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("Error!!!");
    }
  },

  getImageProduct: async (req, res) => {
    try {
      const imageName = req.params.imageName;

      const imagePath = path.join(__dirname, "../uploads", imageName);

      if (!fs.existsSync(imagePath)) {
        return res.status(404).json({ error: "Image not found" });
      }

      fs.readFile(imagePath, (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        res.writeHead(200, { "Content-Type": "image/png" });
        res.end(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = ProductController;
