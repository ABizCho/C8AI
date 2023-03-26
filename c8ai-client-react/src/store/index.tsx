import { configureStore } from "@reduxjs/toolkit";

// import xxxSlice from "./"
// import xxxSlice from "./"

const store = configureStore({
  reducer: {
    /*
		xxx : xxxSlice.reducer
		xxx : xxxSlice.reducer
		*/
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
