import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAuthorisation } from '../../../redux/userRedux.js';

import styles from './PostAdd.module.scss';
import { addPostRequest } from '../../../redux/postsRedux.js';

import { NotFound } from '../NotFound/NotFound';

class Component  extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      title: '',
      price: 0,
      text: '',
      author: 'author name',
    };
  }

  handleChange = (event) => {
    const id = event.target.id;
    this.setState({[id]: event.target.value});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {addPost} = this.props;
    addPost(this.state);
  }

  render() {

    const { className, children, isLoggedIn } = this.props;
    
    return(
      <div className={clsx('container', className, styles.root)}>
        {isLoggedIn ? 
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" className="form-control" id="title" value={this.state.title} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input type="number" className="form-control" id="price" value={this.state.price} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="text">Text</label>
              <textarea className="form-control" id="text" rows="6" value={this.state.text} onChange={this.handleChange} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
          </form>: 
          <NotFound />
        }
        {children}
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  addPost: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  isLoggedIn: getAuthorisation(state), 
  
});

const mapDispatchToProps = dispatch => ({
  addPost: data => dispatch(addPostRequest(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
