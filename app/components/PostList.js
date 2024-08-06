import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPosts, loadPosts, recountVotes } from '../actions/posts';

import './css/_PostList.css';

@connect(
  ({ posts,sort }) => ({
    error: posts.error,
    pages: posts.pages,
    posts: posts.posts,
    sort: sort
  }),
  (dispatch) => ({
    fetchPosts: async (params) => {
     
     await dispatch( fetchPosts(params));
      return dispatch(recountVotes());
    },
    loadPosts: () => dispatch(loadPosts()),
  })
)
export default class PostList extends Component {
  static propTypes = {
    loadPosts: PropTypes.func,
    posts: PropTypes.object,
  };

  async componentDidMount() {
    this.props.loadPosts();
  }

  async getPosts(page) {
    const {
      sort: { sort },
    } = this.props;
    this.props.fetchPosts({ page ,sort});
  }

  render() {
    const { error, pages, posts } = this.props;
    if (error) {
      return (
        <div className="postList">
          <div className="error">{error}</div>
        </div>
      );
    }

    return (
      <div className="postList">
        <div className="posts">
          {posts.map((post, i) => {
            
            const date = new Date(post.created).toLocaleDateString('en-US');
            return (
              <div className="post" key={i}>
                <div className="votes">{post.votes}</div>
                <div className="words">
                  <div className="title">{post.title}</div>
                  <div className="details">{post.details}</div>
                </div>
                <div className="dateWrapper">
                  <div className="date">{date}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pages">
          {[...Array(pages).keys()].map((i) => {
            const page = i + 1;
            return (
              <div className="page" key={i} onClick={() => this.getPosts(page)}>
                {page}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
