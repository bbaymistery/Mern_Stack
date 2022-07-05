const { deleteComment } = require("../controllers/postController");
router.route("/post/comment/:id").delete(protect, deleteComment); //:id =>postun id sidir
module.exports = router;
