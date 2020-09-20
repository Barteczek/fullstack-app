import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { isAdmin } from '../../../redux/userRedux.js';

import styles from './Post.module.scss';
import { getPost } from '../../../redux/postsRedux.js';

const Component = ({className, children, post, isAdmin}) => {
  
  const {title, id, description, price} = post;
  return(
    <div className={clsx('container', className, styles.root)}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">${price}</h6>
          <p className="card-text">{description}</p>
          {isAdmin ? 
            <a className="btn btn-secondary" href={`/post/${id}/edit`} role="button">Edit</a> : 
            null
          }
        </div>
      </div>
      {children}
    </div>
  );
};
  
Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isAdmin: PropTypes.bool,
  post: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  isAdmin: isAdmin(state), 
  post: getPost(state, ownProps.match.params.id),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
