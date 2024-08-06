import React, { Component } from 'react';

import Header from './Header';
import PostList from './PostList';
import PostSort from './PostSort';

import './css/_App.css';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <PostSort />
        <PostList />
      </div>
    );
  }
}
