import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { isAdmin } from '../../../redux/userRedux.js';

import styles from './Post.module.scss';
import { getAll, fetchPostById } from '../../../redux/postsRedux.js';


class Component  extends React.Component {

  componentDidMount() {
    const { fetchPostById, id} = this.props;
    fetchPostById(id);
  }

  render() {
    const { className, children, isAdmin, id, post } = this.props;

    return(
    
      <div className={clsx('container', className, styles.root)}>
        <div className="card">
          <div className="card-body">
            { post ?
              <div>
                <h5 className="card-title">{post.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">${post.price}</h6>
                <p className="card-text">{post.text}</p>
              </div> :
              null
            }
            {isAdmin ? 
              <a className="btn btn-secondary" href={`/post/${id}/edit`} role="button">Edit</a> : 
              null
            }
          </div>
        </div>
        {children}
      </div>
    );
  }
}
  
Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isAdmin: PropTypes.bool,
  post: PropTypes.any,
  fetchPostById: PropTypes.func,
  id: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
  isAdmin: isAdmin(state), 
  id: ownProps.match.params.id,
  post: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPostById: id => dispatch(fetchPostById(id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
