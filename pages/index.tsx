import Navbar from '../components/Navbar';
import TweetForm from '../components/TweetForm';
import TweetList from '../components/TweetList';
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Home() {
  const { data } = useSWR("/api/users/me");
  const router = useRouter();

  if (data && !data.ok) {
    router.replace("/log-in");
  }

  return (
    data &&
    <>
      <Navbar loggedIn={data ? true : false} />
      <div className="container mx-auto max-w-screen-md">
        <TweetForm />
        <TweetList />
      </div>
    </>
  );
}
