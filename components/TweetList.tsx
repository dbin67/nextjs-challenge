import { ITweet } from "@/lib/types";
import Tweet from "./Tweet";
import useSWR from 'swr';

const TweetList: React.FC = () => {
	const { data } = useSWR(`/api/tweets`);
	console.log(data)
	return (
		data?.ok &&
		<div className="flex flex-col space-y-3 mt-5">
			{data.tweets.map((tweet: ITweet) => (
				<Tweet key={tweet.id} id={tweet.id} />
			))}
		</div>
	);
};

export default TweetList;
