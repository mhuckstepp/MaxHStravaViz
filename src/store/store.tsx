import { configureStore } from '@reduxjs/toolkit'
import mainReducer from '../components/MainProfile/mainSlice'
import stravaReducer from '../components/StravaProfile/stravaSlice'

export const store = configureStore({
  reducer: {
    main: mainReducer,
    strava: stravaReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch