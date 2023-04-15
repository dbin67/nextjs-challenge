import { useState } from 'react';
import { useRouter } from 'next/router';

const TweetForm = () => {
	const router = useRouter();
	const [content, setContent] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const res = await fetch('/api/tweets', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ content }),
			});

			if (res.status === 201) {
				setContent('');
				router.reload();
			} else {
				setError('트윗 작성에 실패했습니다. 다시 시도해 주세요.');
			}
		} catch (err) {
			setError('트윗 작성에 실패했습니다. 다시 시도해 주세요.');
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="flex space-x-4 mt-4">
				<input
					type="text"
					placeholder="트윗 작성..."
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="border border-gray-300 p-2 flex-grow"
				/>
				<button type="submit" className="bg-blue-500 text-white py-2 px-8">
					트윗
				</button>

			</form>
			{error && <p className="text-red-500 mt-4">{error}</p>}
		</>
	);
};

export default TweetForm;
