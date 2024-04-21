const express = require("express");
const router = express.Router();

const {
  createStories,
  editStories,
  getAllStories,
  bookmarkedStories,
  filteredStories,
  userStories,
  getIndividualStories,
} = require("../controllers/storiesController");

router.route("/createstories").post(createStories);
router.route("/editstory/:id").put(editStories);
router.route("/getallstories").get(getAllStories);
router.route("/bookmarkedstories/:id").get(bookmarkedStories);
router.route("/filteredstories").post(filteredStories);
router.route("/userstories/:id").get(userStories);
router.route("/:id").get(getIndividualStories);

module.exports = router;
