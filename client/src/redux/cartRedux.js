import { createSlice, current } from '@reduxjs/toolkit'
const cartSlice = createSlice({
    name: "Cart",
    initialState: {
        quantity: 0,
        totalPrice: 0,
        products: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    },
    reducers: {
        addProduct: (state, action) => {
            //mesela her rengden 3 e r tane eklemis olsa Bizim reduximizda farkli 3 tane item olucak
            let ifExist = state.products.find(
                (item) => item._id === action.payload._id &&
                    item.color === action.payload.color &&
                    item.size === action.payload.size
            );
            if (ifExist) {
                ifExist.quantity += action.payload.quantity;
            } else {
                state.products.push(action.payload);
            }
            state.quantity += action.payload.quantity;
            let totalPrice = state.products.reduce((acc, item) => {
                return (acc = acc + item.price * item.quantity)
            }, 0)
            state.totalPrice = totalPrice

            if (current(state.products)) {
                let items = current(state.products)
                localStorage.setItem("cartItems", JSON.stringify(items));
                localStorage.setItem("2", JSON.stringify("2"));
                console.log(items);
                console.log("items");
            }
        },
        addProductInsideShoppingCart: (state, action) => {
            let ifExist = state.products.find(
                (item) => item._id === action.payload.id &&
                    item.color === action.payload.productColor &&
                    item.size === action.payload.size
            );
            if (ifExist) {
                if (action.payload.type === 'des') {
                    ifExist.quantity -= 1;
                    state.quantity -= 1;
                    if (ifExist.quantity === 0) {
                        state.products.splice(action.payload.index, 1);
                    }
                } else {
                    state.quantity += 1;
                    ifExist.quantity += 1;
                }
                let totalPrice = state.products.reduce((acc, item) => {
                    return (acc = acc + item.price * item.quantity)
                }, 0)
                state.totalPrice = totalPrice
            }
            if (current(state.products)) {
                let items = current(state.products)
                localStorage.setItem("cartItems", JSON.stringify(items));
                console.log(items);
                console.log("items");
            }
        },
        saveShippingInfo: (state, action) => {
            localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
            state.shippingInfo = action.payload
        },
        clearCart: (state) => {
            state.products = []
        },
        delteCompleCartItem: (state, action) => {

            // ..here we r receving index
            state.products.splice(action.payload.index, 1);
            state.quantity -= action.payload.quantity;
            state.totalPrice = current(state.products).reduce((acc, item) => {
                return (acc = acc + item.price * item.quantity)
            }, 0)
            if (current(state.products)) {
                let items = current(state.products)
                localStorage.setItem("cartItems", JSON.stringify(items));
            }

        }
    }
})

export const { addProduct, addProductInsideShoppingCart, saveShippingInfo, clearCart, delteCompleCartItem } = cartSlice.actions
export default cartSlice.reducer



