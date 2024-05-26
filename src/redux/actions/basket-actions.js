const BASKET_URL =
  "https://meals-434b0-default-rtdb.firebaseio.com/basket.json";

const getBasketMealsSuccess = (meals) => {
  return {
    type: "BASKET_MEALS_SUCCESS",
    payload: meals,
  };
};
const getBasketMealsPending = () => {
  return {
    type: "BASKET_MEALS_PENDING",
  };
};
const getBasketMealsFailed = (error) => {
  return {
    type: "BASKET_MEALS_FAILED",
    payload: error,
  };
};

export const getBasketMealsThunk = () => {
  return async (dispatch) => {
    try {
      dispatch(getBasketMealsPending());
      const data = await fetch(BASKET_URL);
      const response = await data.json();
      const groupedItems = {};

      for (const key in response) {
        const item = response[key];
        if (!groupedItems[item.id]) {
          groupedItems[item.id] = {
            id: item.id,
            name: item.name,
            amount: 0,
            price: item.price,
          };
        }
        groupedItems[item.id].amount += item.amount;
      }
      const exchangedMealsToArray = Object.values(groupedItems);

      let totalPrice = 0;
      for (const item of exchangedMealsToArray) {
        totalPrice += item.amount * item.price;
      }

      dispatch(
        getBasketMealsSuccess({
          meals: exchangedMealsToArray,
          totalPrice: totalPrice,
        })
      );
    } catch (error) {
      dispatch(getBasketMealsFailed(error));
    }
  };
};

export const addToBasketMealsThunk = (meals) => {
  return async (dispatch) => {
    try {
      dispatch(getBasketMealsPending());
      await fetch(BASKET_URL, {
        method: "POST",
        body: JSON.stringify(meals),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      dispatch(getBasketMealsThunk());
    } catch (error) {
      dispatch(getBasketMealsFailed(error));
    }
  };
};
