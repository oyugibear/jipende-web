import { createSlice } from "@reduxjs/toolkit";

// NB Hydration Error is caused over here... please have a look and fix it later
// Check for saved state in local storage
let savedState = {
    products: [],
    quantity: 0,
    totalAmount: 0,
};

if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        savedState = JSON.parse(savedCart);
    }
}

const cartSlice = createSlice({
    name: "cart",
    initialState: savedState,
    reducers: {
        addProduct: (state, action) => {
            // console.log("Payload:", action.payload);
            const { product, date, time } = action.payload;
            const productWithDateTime = { ...product, date, time };
            state.products.push(productWithDateTime);
            state.quantity += 1;
            
            // Calculate total amount
            let totalAmount = Number(state.totalAmount);
            state.products.forEach((product) => {
                totalAmount += Number(product.price);
            });
            state.totalAmount = totalAmount;
            
            // Save state to local storage
            if (typeof window !== 'undefined') {
                localStorage.setItem('cart', JSON.stringify(state));
            }
        },
        
        removeProductFromCart: (state, action) => {
            const { id } = action.payload;
            console.log("Removing product with ID:", state);
            const productIndex = state.cart.products.findIndex((p) => p.product._id === id)
      
            if (productIndex !== -1) {
              // If the product is found in the cart, remove it
              const productToRemove = state.products[productIndex]
              state.products.splice(productIndex, 1)
              state.total -= productToRemove.price
              state.totalAmount -= productToRemove.price
              state.quantity -= productToRemove.quantity
            }
      
            // Update the total price of the cart
            state.total = state.products.reduce((acc, p) => acc + p.price, 0)
        },
        
        reset: (state) => {
            state.products = [];
            state.total = 0;
            state.quantity = 0;
            
            // Delete content in local storage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('cart');
            }
        },

        replaceCart: (state, action) => {
            return action.payload;
        }
    }
});

export const { addProduct, reset, replaceCart, removeProductFromCart} = cartSlice.actions;
export default cartSlice.reducer;