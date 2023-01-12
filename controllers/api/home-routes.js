const router = require("express").Router();
const { Comment, Post } = require("../../models");
// TODO: Import the custom middleware

// GET all posts for homepage
router.get("/", async (req, res) => {
  console.log("hello");
  try {
    const dbBlogDb = await Post.findAll({
      //   include: [
      //     {
      //       model: Post,
      //       attributes: ["filename", "description"],
      //     },
      //   ],
    });

    const blogDb = dbBlogDb.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      blogDb,
      //   loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// TODO: Replace the logic below with the custom middleware
router.get("/post/:id", async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    // If the user is logged in, allow them to view the gallery
    try {
      const dbPost = await Post.findByPk(req.params.id, {
        include: [
          {
            model: Comment,
            attributes: ["id", "title", "body", "user_id"],
          },
        ],
      });
      const blogPost = dbPost.get({ plain: true });
      res.render("post", { blogPost, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// dashboard route

router.get("/dashboard", (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    res.render("dashboard");
  }
});
module.exports = router;
