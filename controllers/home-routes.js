const router = require('express').Router();
const { Post, User, Comments } = require('../models');
// Import the custom middleware
// eslint-disable-next-line no-unused-vars
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({});

    const postLogged = postData.map((post) => post.get({ plain: true }));
    return res.render('home', {
      posts: postLogged,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comments,
          include: [User],
        },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }
    const postBlog = postData.get({ plain: true });
    console.log(postBlog);
    return res.render('blog', {
      post: postBlog,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  res.render('dashboard', {
    loggedIn: req.session.loggedIn,
  });
});

router.get('/login', async (req, res) => {
  res.render('login');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

router.get('/logout', async (req, res) => {
  res.render('login');
});

router.get('/post', async (req, res) => {
  try {
    const postData = await Post.findAll({});

    const postLogged = postData.map((post) => post.get({ plain: true }));
    console.log(postLogged);
    return res.render('post', {
      postLogged,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/post', withAuth, async (req, res) => {
  res.render('post');
});

router.get('/post/:id', withAuth, async (req, res) => {
  res.render('blog');
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
