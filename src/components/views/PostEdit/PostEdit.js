import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { isAdmin } from '../../../redux/userRedux.js';

import styles from './PostEdit.module.scss';
import { getAll, changePost, fetchPostById } from '../../../redux/postsRedux.js';

import { NotFound } from '../NotFound/NotFound';

class Component  extends React.Component {

  initState = () => {
    const { post } = this.props;
    if (post) {
      const {title, price, text} = post;
      this.setState({title: title, price: price, text: text});
    }
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

  async componentDidMount() {
    const { fetchPostById, id } = this.props;
    await fetchPostById(id);
    
    this.initState();
  }

  render() {

    const { className, children, isAdmin, post } = this.props;
    
    return(
      <div className={clsx('container', className, styles.root)}>
        {post && isAdmin ? 
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" className="form-control" id="title" value={this.state.title} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input type="text" className="form-control" id="price" value={this.state.price} onChange={this.handleChange} />
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
  isAdmin: PropTypes.bool,
  post: PropTypes.object,
  changePost: PropTypes.func,
  fetchPostById: PropTypes.func,
  id: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
  isAdmin: isAdmin(state), 
  id: ownProps.match.params.id,
  post: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  changePost: data => dispatch(changePost(data)),
  fetchPostById: id => dispatch(fetchPostById(id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
