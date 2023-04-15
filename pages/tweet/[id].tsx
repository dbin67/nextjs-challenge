import { useRouter } from 'next/router';
import useSWR from 'swr';
import Navbar from '../../components/Navbar';
import TweetDetail from '../../components/TweetDetail';

const Tweet = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data, error } = useSWR(id ? `/api/tweets/${id}` : null,);

	if (error) return <p>트윗을 불러오는 도중 에러가 발생했습니다.</p>;

	return (
		data &&
		<>
			<Navbar />
			<TweetDetail {...data.tweet} />
		</>
	);
};

export default Tweet;
