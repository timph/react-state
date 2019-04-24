const fetch = require('node-fetch');
const https = require('https');
const decode = require('unescape');

const agent = new https.Agent({
  rejectUnauthorized: false
});

function hashCode(s) {
  if (!s) return Math.floor(Math.random() * 1000000);
  return Math.abs(s.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0));
}

async function getSubreddit(name) {
  let json;
  try {
    const response = await fetch(`https://www.reddit.com/r/${name}.json`, { agent });
    json = await response.json();
  } catch (e) {
    console.error('Error getting data from reddit', e);
    throw e;
  }

  if (json.status < 200 || json.status > 299) {
    throw new Error('Fail to get reddit data');
  }

  let { children: postList = [] } = (json && json.data) || {};

  // limit to first 10 posts
  if (postList.length > 10) {
    postList = postList.slice(0, 10);
  }

  // convert to our data model
  postList = postList.map(({ data }) => {
    return {
      id: hashCode(data.permalink),
      link: data.permalink || '',
      title: data.title,
      selftext: decode(data.selftext_html || '')
    };
  });

  return { posts: postList };
}

module.exports = getSubreddit;
