const redux = require('redux');
const reduxLogger = require('redux-logger');

// Action Constants
const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

// Action Creators
function buyCake() {
  return {
    type: BUY_CAKE,
    info: 'my first action',
  };
}

function buyIcecream() {
  return {
    type: BUY_ICECREAM,
  };
}

const initialCakeState = {
  numOfCakes: 10,
};

const initialIcecreamState = {
  numOfIcecream: 15,
};

// Reducers
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };

    default:
      return state;
  }
};

const icecreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOFIcecream: state.numOfIcecream - 1,
      };

    default:
      return state;
  }
};

// combine all reducers
const rootReducer = redux.combineReducers({
  cake: cakeReducer,
  icecream: icecreamReducer,
});

// Middleware
const logger = reduxLogger.createLogger();

/**
 * when we dispatch an action both reducers accepts that action the difference is that
 * one acts on that action while other just ignores that action(handled by default case)
 */

// Create Store
const store = redux.createStore(rootReducer, redux.applyMiddleware(logger));

// Log Statement
console.log('Initial State', store.getState());

const listenerFunc = () => {
  // console.log('Updated State', store.getState());
};

const unregisterListener = store.subscribe(listenerFunc);

// Dispatch Actions
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyCake());
store.dispatch(buyIcecream());

unregisterListener();
