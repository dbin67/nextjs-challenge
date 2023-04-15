import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import useSWR from "swr";


interface FormData {
	email: string;
	password: string;
}

const LogIn = () => {
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
	const router = useRouter();
	const [error, setError] = useState('');
	const { data } = useSWR("/api/users/me");

	if (data && data.ok) {
		router.replace("/");
	}

	const onSubmit = async (data: FormData) => {
		try {
			const res = await fetch('/api/users/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			if (res.status === 200) {
				router.replace('/');
			} else {
				setError('로그인에 실패했습니다. 다시 시도해 주세요.');
			}
		} catch (err) {
			setError('로그인에 실패했습니다. 다시 시도해 주세요.');
		}
	};

	return (
		<>
			<Navbar />
			<div className="container mx-auto max-w-screen-md">
				<h1 className="text-xl text-center mt-10">로그인</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 mt-4">
					<input
						type="email"
						placeholder="이메일"
						{...register('email', {
							required:
								'이메일을 입력하세요.'
						})}
						className={`border border-gray-300 p-2 ${errors.email && 'border-red-500'}`}
					/>
					{errors.email && <p className="text-red-500">{errors.email.message}</p>}
					<input
						type="password"
						placeholder="비밀번호"
						{...register('password', {
							required: '비밀번호를 입력하세요.'
						})}
						className={`border border-gray-300 p-2 ${errors.password && 'border-red-500'}`}
					/>
					{errors.password && <p className="text-red-500">{errors.password.message}</p>}
					<button type="submit" className="bg-blue-500 text-white p-2">
						로그인
					</button>
					{error && <p className="text-red-500 mt-4">{error}</p>}
				</form>
			</div>
		</>
	);
};

export default LogIn;
