const express = require("express");
const Main = require("../../models/BlogPost"); // Assuming the schema is in models/Main.js
const AuthChecker = require("../../component/common/AuthChecker");

const router = express.Router();

router.get("/getbyid/:id/:blogId", async (req, res) => {
  const { token } = req.headers;
  const { id, blogId } = req.params;

  try {
    // Check if the user is authorized
    const isAuth = await AuthChecker(token, id);
    if (!isAuth) {
      return res.status(403).send({ error: "Unauthorized access" });
    }

    // Fetch a specific document based on blogId
    const document = await Main.findOne({ blogId });

    if (!document) {
      return res.status(404).send({ error: "Blog not found" });
    }

    res.status(200).send({ data: document });
  } catch (error) {
    console.error("Error fetching document:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
