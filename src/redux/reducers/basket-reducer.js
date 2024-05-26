const initialState = {
  addedMeals: [],
  totalPrice: 0,
  isLoading: false,
  error: null,
};

export const basketReducer = (state = initialState, action) => {
  if (action.type === "BASKET_MEALS_PENDING") {
    return { ...state, isLoading: true };
  }
  if (action.type === "BASKET_MEALS_SUCCESS") {
    return {
      ...state,
      addedMeals: action.payload.meals,
      isLoading: false,
      error: null,
      totalPrice: action.payload.totalPrice,
    };
  }
  if (action.type === "BASKET_MEALS_FAILED") {
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };
  }
  return state;
};
