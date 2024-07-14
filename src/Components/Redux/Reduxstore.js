
import { configureStore, createSlice,combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const initialState = {
    userdata:null,
isLogedin:false,
allusers:[],
roles:[]
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserdata: (state, action) => {
      state.userdata = action.payload;
    },
    setisLoggedin: (state, action) => {
        state.isLogedin = action.payload;
      },
      setallusers: (state, action) => {
        state.allusers = action.payload;
      },
      setroles: (state, action) => {
        state.roles = action.payload;
      },

  }
});



export const {setUserdata,setisLoggedin,setallusers,setroles} = userSlice.actions;


const rootReducer = combineReducers({
  user: userSlice.reducer
});

const persistConfig = {
  key: 'persist-root',
  storage,
};

const persistedReducer = persistReducer(persistConfig,rootReducer);

 const store = configureStore({
  reducer: persistedReducer
});

 const persistor = persistStore(store);
export  {store,persistor};

