import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import cartReducer from './cart'
import productsReducer from './products'
import usersReducer from './allUsers'
import singleProductReducer from './singleProduct'
import filterReducer from './filter'
import orderReducer from './orders'

export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
    users: usersReducer,
    singleProduct: singleProductReducer,
    filter: filterReducer,
    orders: orderReducer
  },
})
