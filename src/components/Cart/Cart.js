import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import CartContext from '../../context/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
	const cartCtx = useContext(CartContext);
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submissionError, setSubmissionError] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);

	const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const orderHandler = () => {
		setIsCheckout(true);
	};

	const modalActions = (
		<div className={classes.actions}>
			<button className={classes['button--alt']} onClick={props.onClose}>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);
		try {
			const response = await fetch(process.env.REACT_APP_FIREBASE_POST_KEY, {
				method: 'POST',
				body: JSON.stringify({
					user: userData,
					orderedItems: cartCtx.items,
				}),
			});
			if (!response.ok) {
				throw new Error('Error in submitting form!');
			}
		} catch (err) {
			setSubmissionError(err.message);
			setIsSubmitting(false);
			return;
		}
		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.clearCart();
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

	const cartModalContent = (
		<>
			{cardItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && (
				<Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
			)}
			{!isCheckout && modalActions}
		</>
	);

	const isSubmittingModalContent = <p>Sending order data!</p>;

	const didSubmitModalContent = (
		<>
			<p>Successfully sent order data!</p>
			<div className={classes.actions}>
				<button className={classes.button} onClick={props.onClose}>
					Close
				</button>
			</div>
		</>
	);

	const errorInSubmitModalContent = <p>Error in submission, try again!</p>;

	return (
		<Modal onClose={props.onClose}>
			{submissionError && errorInSubmitModalContent}
			{!isSubmitting && !submissionError && !didSubmit && cartModalContent}
			{isSubmitting && !submissionError && isSubmittingModalContent}
			{!isSubmitting && !submissionError && didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;
