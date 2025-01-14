/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Link as GLink, Select, Spacer, Text } from '@geist-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import logo from '../assets/logo/reacher.svg';
import { sentryException } from '../util/sentry';
import { useUser } from '../util/useUser';
import styles from './Nav.module.css';

export function Nav(): React.ReactElement {
	const { user, userDetails, signOut } = useUser();
	const router = useRouter();

	return (
		<header className={styles.container}>
			<div>
				<a
					className="flex"
					href={user ? '/dashboard' : 'https://reacher.email'}
				>
					<Image height={24} src={logo} width={24} />
					<Text className={styles.reacher} h3>
						Reacher
						{user && (
							<Text
								className={styles.dashboard}
								span
								type="secondary"
							>
								Dashboard
							</Text>
						)}
					</Text>
					<Spacer x={0.5} />
				</a>
			</div>

			<div className={styles.filler} />

			<div>
				<GLink className={styles.link} href="/pricing">
					Pricing
				</GLink>

				<GLink
					className={styles.link}
					href="https://help.reacher.email"
					target="_blank"
					rel="noopener noreferrer"
				>
					Help Center
				</GLink>
			</div>
			{user && (
				<Select
					className={styles.dropdown}
					placeholder={userDetails?.full_name || user.email}
				>
					<Select.Option
						onClick={() => {
							signOut()
								.then(() => router.push('/login'))
								.catch(sentryException);
						}}
					>
						Log Out{' '}
					</Select.Option>
				</Select>
			)}
		</header>
	);
}
