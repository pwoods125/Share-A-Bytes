const router = require('express').Router();
const { Comments, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const commentData = await Comments.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    const commentPosted = commentData.map((comment) =>
      comment.get({ plain: true }),
    );
    return res.render('post/:id', {
      comment: commentPosted,
      user_id: req.session.user_id,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comments.findAll({
      include: [
        {
          model: User,
        },
      ],
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(commentData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const newComments = await Comments.create({
      commentText: req.body.comment,
      user_id: req.session.user_id,
      post_id: req.body.postid,
    });
    res.json(newComments);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: '404 Comment not found' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
