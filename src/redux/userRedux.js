/* selectors */
export const getAuthorisation = ({user}) => user.isLoggedIn;
export const isAdmin = ({user}) => user.user === 'admin';
export const getUser = ({user}) => user.user;

/* action name creator */
const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const SET_AUTHORISATION = createActionName('SET_AUTHORISATION');

/* action creators */
export const setAuthorisation = payload => ({ payload, type: SET_AUTHORISATION });

/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case SET_AUTHORISATION: {
      const userType = action.payload;
      const isLoggedCheck = ['user', 'admin'].includes(userType);
      
      return {
        ...statePart,
        isLoggedIn: isLoggedCheck,
        user: userType,
      };
    }
    default:
      return statePart;
  }
};
