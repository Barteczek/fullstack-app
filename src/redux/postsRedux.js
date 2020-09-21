import Axios from 'axios';

/* selectors */
export const getAll = ({posts}) => posts.data;
export const getPost = ({posts}, id) => !typeof(posts) === undefined ? posts.data.find(post => post.id === id) : null;

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const CHANGE_POST = createActionName('CHANGE_POST');
const ADD_POST = createActionName('ADD_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const changePost = payload => ({ payload, type: CHANGE_POST });
export const addPost = payload => ({ payload, type: ADD_POST });

/* thunk creators */
export const fetchPublished = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    const state = getState();
    if(!state.posts.data && state.posts.loading.active === true){
      Axios
        .get('http://localhost:8000/api/posts')
        .then(res => {
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    } 
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case CHANGE_POST: {
      const {id, title, price, description} = action.payload;
    
      const newState = {...statePart};
      const index = newState.data.findIndex(post => post.id === id);
      
      newState.data[index].title = title;
      newState.data[index].price = price;
      newState.data[index].description = description;
      
      return newState;
    }
    case ADD_POST: {
      const newState = {...statePart};
      newState.data.push(action.payload);
      
      return newState;
    }
    default:
      return statePart;
  }
};
