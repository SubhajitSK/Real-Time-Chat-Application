const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.get("/:room", async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.room }).sort({
      createdAt: 1,
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:room", async (req, res) => {
  try {
    await Message.deleteMany({ room: req.params.room });
    res.json({ message: "Chat data deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

module.exports = router;
