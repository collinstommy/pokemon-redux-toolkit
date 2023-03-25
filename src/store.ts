import { fetchPokemon } from "./api";
import { Pokemon } from "./types";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type State = {
  pokemon: Pokemon[];
  votes: Record<number, number>;
  loading: boolean;
};

const initialState: State = {
  pokemon: [],
  votes: {},
  loading: false,
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    upVote: (state, action: PayloadAction<number>) => ({
      ...state,
      votes: {
        ...state.votes,
        [action.payload]: (state.votes[action.payload] || 0) + 1,
      },
    }),
    downVote: (state, action: PayloadAction<number>) => ({
      ...state,
      votes: {
        ...state.votes,
        [action.payload]: (state.votes[action.payload] || 0) - 1,
      },
    }),
    setLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loading: action.payload,
    }),
    pokemonReceived: (state, action: PayloadAction<Pokemon[]>) => ({
      ...state,
      loading: false,
      pokemon: action.payload,
    }),
  },
});

export const { setLoading, pokemonReceived, upVote, downVote } =
  pokemonSlice.actions;

export const getPokemon = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  const response = await fetchPokemon();
  dispatch(pokemonReceived(response));
};

export const store = configureStore({
  reducer: {
    pokemon: pokemonSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
