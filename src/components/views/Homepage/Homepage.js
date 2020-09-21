import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAuthorisation } from '../../../redux/userRedux.js';

import styles from './Homepage.module.scss';
import { getAll, fetchPublished } from '../../../redux/postsRedux.js';

class Component  extends React.Component {

  componentDidMount() {
    const { fetchPublishedPosts } = this.props;
    fetchPublishedPosts();
  }

  render() {

    const { className, children, isLoggedIn, posts } = this.props;

    return (
      <div className={clsx('container', className, styles.root)}>
        <div className='container'>
          {isLoggedIn ? 
            <a className="btn btn-secondary" href="/post/add" role="button">Add new ad</a> : 
            null
          }
          <div className="container">
            <div className='row'>
              {posts && posts.map(item => (
                <a key={item._id} href={`/post/${item._id}`} className="btn btn-primary col-12 m-3">{item.title}</a>
              ))}
            </div>
          </div>
        </div>
        {children }
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  posts: PropTypes.array,
  fetchPublishedPosts: PropTypes.func,
};

const mapStateToProps = state => ({
  isLoggedIn: getAuthorisation(state),
  posts: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
