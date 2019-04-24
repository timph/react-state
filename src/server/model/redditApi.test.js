const fetchMock = require('fetch-mock');
const getSubreddit = require('./redditApi');
const mockData = require('./fixtures/subreddit-reactjs');

test('getSubreddit with full set', async () => {
  const name = 'reactjs';
  fetchMock.restore().getOnce(`https://www.reddit.com/r/${name}.json`, JSON.stringify(mockData));

  const result = await getSubreddit(name);

  expect(result.posts.length).toEqual(10);
  expect(result.posts[0].title).toEqual("Beginner's Thread / Easy Questions (April 2019)");
  expect(result.posts[0].id).toEqual(1025093681);
});

test('getSubreddit with 404', async () => {
  const name = 'testing';
  fetchMock.restore().getOnce(`https://www.reddit.com/r/${name}.json`, 404);

  try {
    await getSubreddit(name);
  } catch (e) {
    expect(e.message).toEqual('Fail to get reddit data');
  }
});
