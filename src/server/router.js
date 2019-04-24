const getSubreddit = require('./model/redditApi')

module.exports = function setupRoutes(router) {
  router.get('/api/subreddit/:name', async (req, res) => {
    const subredditName = req.params.name;

    console.log(`Loading subreddit ${subredditName}`);
    try {
      const posts = await getSubreddit(subredditName);
      res.send(posts);
    } catch (e) {
      console.error('Catch error', e.message);
      res.sendStatus(500);
    }
  });
};
