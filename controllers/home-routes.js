const router = require('express').Router();
const { Post } = require('../models');
// Import the custom middleware
// eslint-disable-next-line no-unused-vars
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({});

    const postLogged = postData.map((post) => post.get({ plain: true }));
    console.log(postLogged);
    return res.render('home', {
      posts: postLogged,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  res.render('dashboard');
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
