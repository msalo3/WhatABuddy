import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const config = {
  key: 'root',
  storage,
  whitelist: [],
  stateReconciler: autoMergeLevel2
};

const reducer = persistCombineReducers(config, reducers);

export default function configureStore() {
  const store = createStore(reducer, applyMiddleware(thunk));
  const persistor = persistStore(store);

  return { persistor, store };
}
