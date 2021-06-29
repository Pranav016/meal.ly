import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.length === 5;

const Checkout = (props) => {
	const [formIsValid, setFormIsValid] = useState({
		name: true,
		street: true,
		city: true,
		postalCode: true,
	});
	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalCodeInputRef = useRef();
	const cityInputRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostalCode = postalCodeInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredStreetIsValid = !isEmpty(enteredStreet);
		const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
		const enteredCityIsValid = !isEmpty(enteredCity);

		setFormIsValid({
			name: enteredNameIsValid,
			street: enteredStreetIsValid,
			city: enteredCityIsValid,
			postalCode: enteredPostalCodeIsValid,
		});

		const validForm =
			enteredNameIsValid &&
			enteredStreetIsValid &&
			enteredPostalCodeIsValid &&
			enteredCityIsValid;

		if (!validForm) {
			return;
		}

		props.onConfirm({
			name: enteredName,
			street: enteredStreet,
			city: enteredCity,
			postalCode: enteredPostalCode,
		});
	};

	const nameControlClasses = `${classes.control} ${
		formIsValid.name ? '' : classes.invalid
	}`;
	const streetControlClasses = `${classes.control} ${
		formIsValid.street ? '' : classes.invalid
	}`;
	const postalCodeControlClasses = `${classes.control} ${
		formIsValid.postalCode ? '' : classes.invalid
	}`;
	const cityControlClasses = `${classes.control} ${
		formIsValid.city ? '' : classes.invalid
	}`;

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={nameControlClasses}>
				<label htmlFor='name'>Your Name</label>
				<input type='text' id='name' ref={nameInputRef} />
				{!formIsValid.name && <p>Please enter a valid value for this field!</p>}
			</div>
			<div className={streetControlClasses}>
				<label htmlFor='street'>Street</label>
				<input type='text' id='street' ref={streetInputRef} />
				{!formIsValid.street && (
					<p>Please enter a valid value for this field!</p>
				)}
			</div>
			<div className={postalCodeControlClasses}>
				<label htmlFor='postal'>Postal Code</label>
				<input type='text' id='postal' ref={postalCodeInputRef} />
				{!formIsValid.postalCode && (
					<p>Please enter a valid value for this field! (5 chars)</p>
				)}
			</div>
			<div className={cityControlClasses}>
				<label htmlFor='city'>City</label>
				<input type='text' id='city' ref={cityInputRef} />
				{!formIsValid.city && <p>Please enter a valid value for this field!</p>}
			</div>
			<div className={classes.actions}>
				<button type='button' onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
