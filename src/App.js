import Header from "./components/Layout/Header/Header";
import {useContext, useState} from "react";
import Meals from "./components/Meals/Meals/Meals";
import Cart from "./components/Cart/Cart/Cart";
import CartContext from "./store/cart-context";
import {CartContextProvider} from "./store/CartProvider";

function App() {
  const [cartShouldBeShown, setCartShouldBeShown] = useState(false);

  const hideCartHandler = () => {
    setCartShouldBeShown(false);
  };

  const showCartHandler = () => {
    setCartShouldBeShown(true);
  };

  return (
    <CartContextProvider>
      {cartShouldBeShown && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartContextProvider>
  );
}

export default App;
