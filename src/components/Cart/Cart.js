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
		<div>
			{cardItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>29.99</span>
			</div>
			<div className={classes.actions}>
				<button className={classes['button--alt']}>Close</button>
				<button className={classes.button}>Order</button>
			</div>
		</div>
	);
};

export default Cart;
