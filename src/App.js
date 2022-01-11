import React, {useState, useEffect } from "react";

import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart , Checkout } from './componenets';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
 
    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    };

    const fetchCart = async () => {
    
        setCart(await commerce.cart.retrieve())
    };

    const handleAddToCart = async (productid, quantity) => {
        const {cart} = await commerce.cart.add(productid, quantity);

        setCart(cart);
    };

    const handleUpdateCardQty = async (productid, quantity) => {
        const {cart} = await commerce.cart.update(productid, { quantity });

        setCart(cart);
    };

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();

        setCart(cart);
    };

    const refreshCart = async () =>{
        const newCart = await commerce.cart.refresh();

        setCart(newCart);
    }

    const handleCaptureCheckout = async(checkoutTokenId, newOrder) =>{
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

            setOrder(incomingOrder);
            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    }

    const handleRemoveFromCart = async (productid) => {
        const { cart } = await commerce.cart.remove(productid);

        setCart(cart);
    };

    useEffect(() =>{
        fetchProducts();
        fetchCart();
    }, []);


    return ( 
        <Router>
        <div>
            <Navbar totalItems={ cart.total_items }/>
            <Switch>
                <Route exact path="/">
                    <Products products={ products } onAddToCart={ handleAddToCart }/>
                </Route>
                <Route exact path="/cart">
                    <Cart cart={cart} handleUpdateCardQty={ handleUpdateCardQty }
                    handleRemoveFromCart={ handleRemoveFromCart } handleEmptyCart={ handleEmptyCart }/>
                </Route>
                <Route exact path="/checkout">
                    <Checkout
                     cart={ cart }
                     order={order}
                     onCaptureCheckout={handleCaptureCheckout}
                     error={errorMessage}
                    />
                </Route>
            </Switch>
        </div>
        </Router>
     ); 
}
 
export default App;