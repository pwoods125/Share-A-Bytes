const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const postData = await Post.create({
      postTitle: req.body.postTitle,
      content: req.body.content,
      date_created: req.body.date_created,
      user_id: req.session.user_id,
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/post/:id', async (req, res) => {
  try {
    const postData = await Post.update(
      {
        postTitle: req.body.postTitle,
        content: req.body.content,
        date_created: req.body.date_created,
        user_id: req.body.user_id,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
