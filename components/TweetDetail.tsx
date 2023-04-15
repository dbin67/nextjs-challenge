import { ITweet } from '@/lib/types';
import { formatDate } from '../lib/utils';
import useSWR from 'swr';

const TweetDetail = ({ id }: ITweet) => {
	const { data, mutate } = useSWR(`/api/tweets/${id}`,);
	const onLikeClick = async () => {
		await fetch(`/api/tweets/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ like: !data.tweet.like }),
		});
		mutate();
	};

	return (
		data &&
		<div className='container mx-auto mt-10'>
			<div className="border border-gray-300 p-4 mb-4">
				<div className="text-sm text-gray-500 pb-5">
					{data.tweet.author.name} • {formatDate(data.tweet.createdAt.toString())}
				</div>
				<p className="text-base pb-10">{data.tweet.content}</p>
				<button
					onClick={onLikeClick}
					className="rounded-md bg-[#0daaea] w-16 p-2 text-xs text-white ring-2 ring-[#0a5886] hover:underline"
				>
					{data.tweet.like ? "UnLike" : "Like"}
				</button>
			</div>
		</div>
	);
};

export default TweetDetail;
