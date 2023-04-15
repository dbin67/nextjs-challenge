export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();

	const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}:${minutes.toString().padStart(2, '0')}`;
	return formattedDate;
};

