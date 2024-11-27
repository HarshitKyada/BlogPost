// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const AuthChecker = require("../../component/common/AuthChecker");
// const BlogPost = require("../../models/BlogPost");

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 1024 * 1024 * 5 },
// });

// router.post(
//   "/addnew/:id",
//   upload.fields([
//     { name: "mainImage", maxCount: 1 },
//     { name: "contentImages" },
//   ]),
//   async (req, res) => {
//     const { token } = req.headers;
//     const { id } = req.params;

//     try {
//       const isAuth = await AuthChecker(token, id);
//       if (!isAuth) {
//         return res.status(403).send({ error: "Unauthorized access" });
//       }

//       const { mainTitle, title, content } = req.body;
//       const mainImageFile = req.files["mainImage"]?.[0];
//       const contentImages = req.files["contentImages"];

//       if (!mainTitle || !title || !content) {
//         return res.status(400).send({ error: "All fields are required" });
//       }

//       const parsedContent = JSON.parse(content).map((item, index) => {
//         if (item.type === "image") {
//           return {
//             ...item,
//             value: contentImages?.[index]?.path || null,
//           };
//         }
//         return item;
//       });

//       const newDocument = new BlogPost({
//         mainTitle,
//         mainImage: mainImageFile?.path || null,
//         title,
//         content: parsedContent,
//       });

//       await newDocument.save();
//       res
//         .status(201)
//         .send({ message: "Document added successfully", data: newDocument });
//     } catch (error) {
//       console.error("Error adding document:", error);
//       res.status(500).send({ error: "Internal Server Error" });
//     }
//   }
// );

// module.exports = router;
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const AuthChecker = require("../../component/common/AuthChecker");
const Main = require("../../models/Main"); // Assuming the schema is in models/Main.js

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Define upload folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for unique filenames
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
});

router.post(
  "/addnew/:id",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "contentImages" }, // For content images
  ]),
  async (req, res) => {
    const { token } = req.headers;
    const { id } = req.params;
    const { blogId, mainTitle, title, content } = req.body;

    try {
      const isAuth = await AuthChecker(token, id);
      if (!isAuth) {
        return res.status(403).send({ error: "Unauthorized access" });
      }

      // Validate inputs
      if (!blogId || !mainTitle || !title || !content) {
        return res.status(400).send({ error: "All fields are required" });
      }

      const mainImageFile = req.files["mainImage"]?.[0]; // Access uploaded mainImage
      const contentImages = req.files["contentImages"]; // Access uploaded content images

      // Parse and replace image files in content
      const parsedContent = JSON.parse(content).map((item, index) => {
        if (item.type === "image") {
          return {
            ...item,
            value: contentImages?.[index]?.path || null,
          };
        }
        return item;
      });

      // Create and save the new document
      const newDocument = new Main({
        blogId, // Set the unique blogId
        mainTitle,
        mainImage: mainImageFile?.path || null,
        title,
        content: parsedContent,
      });

      await newDocument.save();
      res
        .status(201)
        .send({ message: "Document added successfully", data: newDocument });
    } catch (error) {
      console.error("Error adding document:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
