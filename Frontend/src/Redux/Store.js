import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import   dataSlice  from './Reducer'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Note: Import storage directly

const userPersistConfig = { key: 'energy', storage };
const userPersistReducer = persistReducer(userPersistConfig,dataSlice);


 const store = configureStore({
  reducer: {dataSlice:userPersistReducer},
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})


const persistor = persistStore(store);

export { store, persistor }; // Export store and persistor as named exports
