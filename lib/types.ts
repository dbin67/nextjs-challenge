export interface ResponseType {
	ok: boolean;
	[key: string]: any;
}


export interface IUser {
	id: number;
	name: string;
	email: string;
	password: string;
}

export interface ITweet {
	id: number;
	content: String;
	createdAt: Date;
	updatedAt: Date;
	author: IUser;
	like: Boolean;
}