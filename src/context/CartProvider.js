import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartActions = {
	ADD: 'ADD',
	REMOVE: 'REMOVE',
};

const cartReducer = (state, action) => {
	switch (action.type) {
		case cartActions.ADD:
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
		default:
			return defaultCartState;
	}
};

const CartProvider = (props) => {
	const [cartState, dispatch] = useReducer(cartReducer, defaultCartState);

	const addItemToCartHandler = (item) => {
		dispatch({ type: cartActions.ADD, item: item });
	};
	const removeItemFromCartHandler = (id) => {
		dispatch({ type: cartActions.REMOVE, id: id });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
