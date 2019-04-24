import React, { Component } from 'react';
import './app.css';
import Counter from './Counter';

export default class App extends Component {
  state = {
    name: null,
    posts: null,
    currentPost: null,
    showSpinner: false,
    showError: false
  };

  componentDidMount() {
    document.getElementById("subreddit").focus();
  }

  populate = (e) => {
    e.preventDefault();
    const name = e.target.subredditInput.value;
    this.setState({ showSpinner: true, showError: false, posts: null, name: null, currentPost: null });

    fetch(`/api/subreddit/${name}`)
      .then((res) => {
        if (res.status !== 200) {
          this.setState({ showError: true, showSpinner: false });
          throw new Error('Fail to get data');
        } else {
          return res.json();
        }
      })
      .then(subreddit => this.setState({ showSpinner: false, posts: subreddit.posts, name }))
      .catch((err) => {
        console.log('Error', err.message);
      });

    e.target.subredditInput.value = '';
  };

  selectPost = (id) => {
    const { posts } = this.state;

    if (posts) {
      const selected = posts.find(p => p.id === id);
      if (selected) {
        this.setState({ currentPost: selected });
      }
    }
  };

  render() {
    const { name, posts, currentPost, showSpinner, showError } = this.state;

    return (
      <div className="container-fluid">

        <div className="row">
          <section id="userInput" className="col-4 border-right border-bottom input-section">
            <form id="subNameForm" onSubmit={this.populate}>
              <label htmlFor="subredditInput" className="userLabel">Enter a subreddit name</label>
              <input type="text" id="subreddit" name="subredditInput" className="userInput" />
              <button type="submit" form="subNameForm" className="userInput">Submit</button>
            </form>

            <section id="posts" className="border-top post-list">
              <h3 className="postsHeader">{!showSpinner && name} Posts</h3>
              { showSpinner && <div className="text-center"><span className="spinner-border text-primary" /></div> }
              { showError && <div className="alert alert-danger" role="alert">Error loading data</div> }
              { !showSpinner &&
                <ul className="posts">
                  { posts
                  && posts.map(post => <li><a href={post.link} onClick={(e) => {
                    e.preventDefault();
                    this.selectPost(post.id);
                  }}>{post.title}</a></li>)}
                </ul>
              }
            </section>
          </section>

          <section id="selectedPost" className="col-8 post">
            <h1 className="appName">A Subreddit App</h1>

            <Counter />

            {currentPost && (
              <article id="post" className="col-8 post-item">
                <h2>{currentPost.title}</h2>
                <div dangerouslySetInnerHTML={{__html: currentPost.selftext}} />
              </article>
            )
            }
          </section>

        </div>

      </div>
    );
  }
}
