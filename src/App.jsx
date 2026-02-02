import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	const [steps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	const isFirstStep = activeIndex === 0;
	const isLastStep = activeIndex === steps.length - 1;

	const onBack = () => {
		if (!isFirstStep) {
			setActiveIndex((prev) => prev - 1);
		}
	};

	const onNext = () => {
		if (!isLastStep) {
			setActiveIndex((prev) => prev + 1);
		}
	};

	const onRestart = () => {
		setActiveIndex(0);
	};

	const onStepClick = (index) => {
		setActiveIndex(index);
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map((step, index) => {
							let itemClasses = styles['steps-item'];
							if (index <= activeIndex) {
								itemClasses += ` ${styles.done}`;
							}
							if (index === activeIndex) {
								itemClasses += ` ${styles.active}`;
							}
							return (
								<li key={step.id} className={itemClasses}>
									<button className={styles['steps-item-button']} onClick={() => onStepClick(index)}>
										{index + 1}
									</button>
									{step.title}
								</li>
							);
						})}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={onBack}
							disabled={isFirstStep}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={isLastStep ? onRestart : onNext}
						>
							{isLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
