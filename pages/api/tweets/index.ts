import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import { withIronSessionApiRoute } from "iron-session/next";
import { cookieOptions } from "../../../lib/cookieOptions";
import { ResponseType } from "@/lib/types";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	if (!req.session.user) {
		return res.status(401).json({ ok: false, error: "Plz log in." });
	}

	if (req.method === 'GET') {
		const tweets = await db.tweet.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				author: true,
			},
		});

		return res.status(200).json({ ok: true, tweets });
	}

	if (req.method === "POST") {
		const userId = req.session.user.id;
		const { content } = req.body;

		if (!content || content.trim() === '') {
			return res.status(400).json({ ok: false, error: 'Content is required' });
		}

		await db.tweet.create({
			data: {
				content,
				author: {
					connect: {
						id: userId,
					},
				},
			},
		});

		return res.status(201).json({ ok: true, message: 'Tweet created' });
	}

	return res.status(405).end();
}

export default withIronSessionApiRoute(handler, cookieOptions);
