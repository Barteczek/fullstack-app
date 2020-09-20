import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAuthorisation } from '../../../redux/userRedux.js';

import styles from './Homepage.module.scss';
import { getAll } from '../../../redux/postsRedux.js';

const Component = ({className, children, isLoggedIn, posts}) => {
  return (
    <div className={clsx('container', className, styles.root)}>
      <div className='container'>
        {isLoggedIn ? 
          <a className="btn btn-secondary" href="/post/add" role="button">Add new ad</a> : 
          null
        }
        <div className="container">
          <div className='row'>
            {posts.map(item => (
              <a key={item.id} href={`/post/${item.id}`} className="btn btn-primary col-12 m-3">{item.title}</a>
            ))}
          </div>
        </div>
      </div>

      {children }
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  posts: PropTypes.object,
};

const mapStateToProps = state => ({
  isLoggedIn: getAuthorisation(state),
  posts: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
