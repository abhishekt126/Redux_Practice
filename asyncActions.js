const redux = require('redux');
const thunk = require('redux-thunk').default;
const axios = require('axios');

const initialState = {
  loading: false,
  users: [],
  error: '',
};

// Actions Constants
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// Sync Action Creator
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

// Reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// store
const store = redux.createStore(reducer, redux.applyMiddleware(thunk));

// Async Action Creator
/**
 * redux-thunk middleware allows action creators to return a function(in which we can perform side effects)
 * rather returning simple actions
 */
const fetchUsers = () => {
  store.dispatch(fetchUsersRequest());
  return function () {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        // response.data is the array of users
        const users = response.data;
        store.dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        // error.message gives the description of the error
        store.dispatch(fetchUsersFailure());
      });
  };
};

store.subscribe(() => {
  console.log('STATE-->', store.getState());
});

store.dispatch(fetchUsers());
