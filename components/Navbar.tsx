import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = ({ loggedIn = false }) => {
	const router = useRouter();
	const handleLogout = async () => {
		await fetch('/api/users/logout', { method: 'POST' });
		router.replace('/log-in');
	}
	return (
		<nav className="bg-blue-500 py-2">
			<div className="container mx-auto max-w-screen-md flex justify-between items-center">
				<Link href="/">
					<a className="text-white font-bold text-lg">트위터 클론</a>
				</Link>
				{!loggedIn ?
					<div className="flex space-x-4">
						<Link href="/log-in">
							<a className="bg-white text-blue-500 font-semibold px-4 py-2 rounded-md">로그인</a>
						</Link>
						<Link href="/create-account">
							<a className="bg-white text-blue-500 font-semibold px-4 py-2 rounded-md">회원가입</a>
						</Link>
					</div>
					:
					<button className="bg-white text-blue-500 font-semibold px-4 py-2 rounded-md" onClick={handleLogout}>
						로그아웃
					</button>
				}
			</div>
		</nav>
	);
};

export default Navbar;
