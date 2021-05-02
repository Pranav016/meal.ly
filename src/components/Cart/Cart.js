import Modal from '../UI/Modal';
import classes from './Cart.module.css';

const Cart = (props) => {
	const cardItems = (
		<ul className={classes['cart-items']}>
			{[
				{
					id: 'm1',
					name: 'Sushi',
					description: 'Finest fish and veggies',
					price: 22.99,
				},
			].map((item) => (
				<li>{item.name}</li>
			))}
		</ul>
	);

	return (
		<Modal onClose={props.onClose}>
			{cardItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>29.99</span>
			</div>
			<div className={classes.actions}>
				<button className={classes['button--alt']} onClick={props.onClose}>
					Close
				</button>
				<button className={classes.button}>Order</button>
			</div>
		</Modal>
	);
};

export default Cart;
