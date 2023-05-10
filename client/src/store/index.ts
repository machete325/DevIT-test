import {
    applyMiddleware,
    createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { RootReducer } from './reducers/RootReducer';
import { rootSaga } from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeWithDevTools(applyMiddleware(
    sagaMiddleware,
));

const store = createStore(RootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export {
    store,
    sagaMiddleware,
};

