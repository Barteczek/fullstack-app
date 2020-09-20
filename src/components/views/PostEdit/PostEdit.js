import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { isAdmin } from '../../../redux/userRedux.js';

import styles from './PostEdit.module.scss';
import { getPost, changePost } from '../../../redux/postsRedux.js';

import { NotFound } from '../NotFound/NotFound';

class Component  extends React.Component {
  constructor(props){
    super(props);
    const {id, title, price, description} = this.props.post;

    this.state = {
      id: id,
      title: title,
      price: price,
      description: description,
    };
  }

  handleChange = (event) => {
    const id = event.target.id;
    this.setState({[id]: event.target.value});
  };

  handleSubmit = (event) => {
    const {changePost} = this.props;
    event.preventDefault();
    changePost(this.state);
  }

  componentDidMount() {
    const {title, price, description} = this.props.post;
    this.setState({title: title, price: price, description: description});
  }

  render() {

    const { className, children, isAdmin } = this.props;
    
    return(
      <div className={clsx('container', className, styles.root)}>
        {isAdmin ? 
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
              <label htmlFor="description">Description</label>
              <textarea className="form-control" id="description" rows="6" value={this.state.description} onChange={this.handleChange} />
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
  isAdmin: PropTypes.bool,
  post: PropTypes.object,
  changePost: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  isAdmin: isAdmin(state), 
  post: getPost(state, ownProps.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  changePost: data => dispatch(changePost(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
