import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAuthorisation, setAuthorisation } from '../../../redux/userRedux.js';

import styles from './Header.module.scss';

class Component  extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user: 'guest',
    };
  }
  

  // initState = () => {
  //   const { post } = this.props;
  //   if (post) {
  //     const {title, price, text} = post;
  //     this.setState({title: title, price: price, text: text});
  //   }
  // }

  handleChange = event => {
    this.setState({user: event.target.value});
    this.props.setUser(event.target.value);
  };

  handleLogoutClick = () =>  this.props.setUser('guest');


  render() {

    const { className, children } = this.props;

    return (
      <div className={clsx('container', className, styles.root)}>
        <div className='container'>
          <div className='row'>
            <div className='col-sm'>
              <select className='btn btn-secondary dropdown-toggle' value={this.state.user} onChange={this.handleChange}>
                <option value='guest'>Guest</option>
                <option value='user'>User</option>
                <option value='admin'>Admin</option>
              </select>
            </div>
            <div className='col-sm'>
              {this.props.isLoggedIn ? 
                <div>
                  <a className="btn btn-secondary mr-2" href="/homepage" role="button">My adds</a>
                  <button className="btn btn-secondary" onClick={this.handleLogoutClick}>Logout</button> 
                </div> : 
                <a className="btn btn-secondary" href="https://google.com" role="button">Log in</a>
              }
            </div>
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
  isLoggedIn: PropTypes.bool,
  setUser: PropTypes.func,
};

const mapStateToProps = state => ({
  isLoggedIn: getAuthorisation(state),
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setAuthorisation(user)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
