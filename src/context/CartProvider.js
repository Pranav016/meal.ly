import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartActions = {
	ADD: 'ADD',
	REMOVE: 'REMOVE',
	CLEAR: 'CLEAR',
};

const cartReducer = (state, action) => {
	if (action.type === cartActions.ADD) {
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;
		/* if the newly added item is already present in the
			cart then we find its index in the cart */
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
		const existingCartItem = state.items[existingCartItemIndex];
		let updatedItems;
		// case for an existing item amount is increased or decreased
		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		}
		// case for a new item being added to the cart
		else {
			updatedItems = state.items.concat(action.item);
		}
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	if (action.type === cartActions.REMOVE) {
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.id
		);
		const existingCartItem = state.items[existingCartItemIndex];
		const updatedTotalAmount = state.totalAmount - existingCartItem.price;
		let updatedItems;
		if (existingCartItem.amount === 1) {
			updatedItems = state.items.filter((item) => item.id !== action.id);
		} else {
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount - 1,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		}
		return { items: updatedItems, totalAmount: updatedTotalAmount };
	}

	if (action.type === cartActions.CLEAR) {
		return defaultCartState;
	}
	return defaultCartState;
};

const CartProvider = (props) => {
	const [cartState, dispatch] = useReducer(cartReducer, defaultCartState);

	const addItemToCartHandler = (item) => {
		dispatch({ type: cartActions.ADD, item: item });
	};
	const removeItemFromCartHandler = (id) => {
		dispatch({ type: cartActions.REMOVE, id: id });
	};
	const clearCartHandler = () => {
		dispatch({ type: cartActions.CLEAR });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
		clearCart: clearCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
