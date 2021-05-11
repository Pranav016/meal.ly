import { useContext, useState, useEffect } from 'react';

import CartContext from '../../context/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
	const [buttonIsBumped, setButtonIsBumped] = useState(false);
	const cartCtx = useContext(CartContext);
	const { items } = cartCtx;

	// array.reduce(function(total or accumulator, currentValue, currentIndex, arr), initialValue)
	const numberOfCartItems = items.reduce(
		(totalCost, item) => totalCost + item.amount,
		0
	);

	const btnClasses = `${classes.button} ${buttonIsBumped ? classes.bump : ''}`;
	useEffect(() => {
		if (items.length === 0) {
			return;
		}
		setButtonIsBumped(true);
		// timer added for 300ms because the animation set is for 300ms
		const timer = setTimeout(() => {
			setButtonIsBumped(false);
		}, 300);

		/* cleanup function is implemented because if button is pressed
		twice successively then previous timer needs to be cleared */
		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
