const router = require("express").Router();
const { Comment, Post } = require("../../models");
// TODO: Import the custom middleware

// GET all galleries for homepage
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

// GET one gallery
// TODO: Replace the logic below with the custom middleware
router.get("/post/:id", async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    // If the user is logged in, allow them to view the gallery
    try {
      const bPost = await Post.findByPk(req.params.id, {
        include: [
          {
            model: Comment,
            attributes: ["id", "title", "body", "user_id"],
          },
        ],
      });
      const blogPost = dbBlogData.get({ plain: true });
      res.render("gallery", { gallery, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// GET one painting
// TODO: Replace the logic below with the custom middleware
router.get("/painting/:id", async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    // If the user is logged in, allow them to view the painting
    try {
      const dbPaintingData = await Painting.findByPk(req.params.id);

      const painting = dbPaintingData.get({ plain: true });

      res.render("painting", { painting, loggedIn: req.session.loggedIn });
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

module.exports = router;
