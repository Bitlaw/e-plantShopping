import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

// CartItem component displays the shopping cart with all added items
const CartItem = ({ onContinueShopping }) => {
  // Access cart items from Redux store
  const cart = useSelector((state) => state.cart.items);
  // Get dispatch function to send actions to Redux store
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce(
      (total, item) => total + Number(item.cost.substring(1)) * item.quantity,
      0
    );
  };

  // Handle continue shopping button click
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // Increase item quantity by 1
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrease item quantity by 1, remove item if quantity reaches 0
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    } else {
      dispatch(removeItem(item));
    }
  };

  // Remove item completely from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Calculate total cost for a specific item based on quantity
  const calculateTotalCost = (item) => {
    return Number(item.cost.substring(1)) * item.quantity;
  };

  return (
    <div className="cart-container">
      {/* Display cart summary */}
      <h2 style={{ color: "black" }}>Total Plants : {cart.length}</h2>
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      {/* Display each item in the cart */}
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>

              {/* Quantity controls */}
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              {/* Item total cost */}
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>

              {/* Remove item button */}
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty div for styling purposes */}
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>

      {/* Action buttons */}
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
