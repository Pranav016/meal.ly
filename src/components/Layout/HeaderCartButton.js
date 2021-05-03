import { useContext } from 'react';

import CartContext from '../../context/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
	const cartCtx = useContext(CartContext);

	// array.reduce(function(total or accumulator, currentValue, currentIndex, arr), initialValue)
	const numberOfCartItems = cartCtx.items.reduce(
		(totalCost, item) => totalCost + item.amount,
		0
	);

	return (
		<button className={classes.button} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
