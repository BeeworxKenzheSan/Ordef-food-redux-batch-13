import { useEffect, useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { useDispatch } from "react-redux";
import { getBasketMealsThunk } from "./redux/actions/basket-actions";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const dispatch = useDispatch();
  function showCartHandler() {
    setCartIsShown(true);
  }

  function hideCartHandler() {
    setCartIsShown(false);
  }

  useEffect(() => {
    dispatch(getBasketMealsThunk());
  }, []);

  return (
    <>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
