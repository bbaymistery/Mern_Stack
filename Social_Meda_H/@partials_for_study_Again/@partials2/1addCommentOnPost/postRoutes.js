const { commentOnPost } = require("../controllers/postController");

router.route("/post/comment/:id").put(protect, commentOnPost);
