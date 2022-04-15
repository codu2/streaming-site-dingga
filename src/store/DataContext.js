import React, { createContext, useReducer, useContext } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const notingState = (type) => {
  throw new Error(`Unhanded action type: ${type}`);
};

const dataReducer = (state, action) => {
  if (action.type === "LOADING") {
    return {
      ...state,
      loading: true,
      data: null,
      error: null,
    };
  }

  if (action.type === "SUCCESS") {
    return {
      ...state,
      loading: false,
      data: action.data,
      error: null,
    };
  }

  if (action.type === "ERROR") {
    return {
      ...state,
      loading: false,
      data: null,
      error: action.error,
    };
  }

  return notingState(action.type);
};

const StateContext = createContext(null);
const DispatchContext = createContext(null);

export const dispatchHandle = async (dispatch) => {
  dispatch({ type: "LOADING" });

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    const data = response.json();

    dispatch({ type: "SUCCESS", data: data });
  } catch (err) {
    dispatch({ type: "ERROR", error: err });
  }
};

export const getData = async (dispatch, id) => {
  dispatch({ type: "LOADING" });

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    );
    const data = response.json();

    dispatch({ type: "SUCCESS", data: data });
  } catch (e) {
    dispatch({ type: "ERROR", error: e });
  }
};

export const DataProvider = async (props) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useDataState = () => {
  const state = useContext(StateContext);
  if (!state) {
    throw new Error("Cannot find DataProvider");
  }
  return state;
};

export const useDataDispatch = () => {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) {
    throw new Error("Cannot find DataProvider");
  }
  return dispatch;
};
