import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
require('dotenv').config();

const AvailableMeals = () => {
	const [meals, setMeals] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();

	useEffect(() => {
		// a top level callback in useEffect cannot be async
		const fetchMeals = async () => {
			const response = await fetch(process.env.REACT_APP_FIREBASE_GET_KEY);
			if (!response.ok) {
				throw new Error('Something went wrong!');
			}
			const responseData = await response.json();

			const laodedMeals = [];
			for (let key in responseData) {
				laodedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				});
			}

			setMeals(laodedMeals);
			setIsLoading(false);
		};

		/* fetchMeals is an async function hence returns a promise
		 if we throw an error inside a promise, it gets rejected
		 thus we do not use try-catch unless we do this `await fetchMeals()`
		 which we cannot do because our callback in useEffect can't be async*/
		fetchMeals().catch((err) => {
			setIsLoading(false);
			setError(err.message);
		});
	}, []);

	if (isLoading) {
		return (
			<section className={classes.mealsLoading}>
				<p>Loading...</p>
			</section>
		);
	}

	if (error) {
		<section className={classes.mealsError}>
			<p>{error}</p>
		</section>;
	}

	const mealsList = meals.map((meal) => (
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));
	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
