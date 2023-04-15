import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import Navbar from '../components/Navbar';

const CreateAccount = () => {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const router = useRouter();
	const [error, setError] = useState('');

	const onSubmit = async (data: any) => {
		try {
			const res = await fetch('/api/users/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (res.status === 201) {
				alert('계정 생성이 완료되었습니다. 로그인하세요.');
				router.replace('/log-in');
			} else {
				setError('계정 생성에 실패했습니다. 다시 시도해 주세요.');
			}
		} catch (err) {
			setError('계정 생성에 실패했습니다. 다시 시도해 주세요.');
		}
	};


	return (
		<>
			<Navbar />
			<div className="container mx-auto max-w-screen-md">
				<h1 className="text-xl text-center mt-10">계정 생성</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 mt-4">
					<input
						type="text"
						placeholder="이름"
						{...register("name", {
							required: '이름을 입력하세요.'
						})}
						className="border border-gray-300 p-2"
					/>
					{errors.name && <p className="text-red-500">{errors.name.message}</p>}
					<input
						type="email"
						placeholder="이메일"
						{...register("email", {
							required: '이메일을 입력하세요.'
						})}
						className="border border-gray-300 p-2"
					/>
					{errors.email && <p className="text-red-500">{errors.email.message}</p>}
					<input
						type="password"
						placeholder="비밀번호"
						{...register("password", {
							required: '비밀번호를 입력하세요.',
						})}
						className="border border-gray-300 p-2"
					/>
					{errors.password && <p className="text-red-500">{errors.password.message}</p>}

					<button type="submit" className="bg-blue-500 text-white p-2">
						계정 생성
					</button>
					{error && <p className="text-red-500 mt-4">{error}</p>}
				</form>
			</div>
		</>
	);
};

export default CreateAccount;
