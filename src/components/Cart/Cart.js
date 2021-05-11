import { useContext } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import CartContext from '../../context/cart-context';

const Cart = (props) => {
	const cartCtx = useContext(CartContext);

	const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const cardItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					/* Bind Method-
					1. Binds an object to a function
					2. Reference it using this in the function */

					/* let bound = func.bind(context, [arg1], [arg2], ...);
					fixing null as the context and item.id as the first argument.
					Further arguments are passed “as is”. (here there is only one
					argument in the function so no need for further arguments)
					Reference- https://javascript.info/bind */
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	return (
		<Modal onClose={props.onClose}>
			{cardItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button
					className={classes['button--alt']}
					onClick={props.onClose}>
					Close
				</button>
				{hasItems && <button className={classes.button}>Order</button>}
			</div>
		</Modal>
	);
};

export default Cart;
