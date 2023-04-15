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
		const tweet = await db.tweet.findUnique({
			where: {
				id: Number(req.query.id),
			},
			include: {
				author: true,
			},
		});

		if (!tweet) {
			res.status(404).json({ ok: false, error: 'Tweet not found' });
		} else {
			res.status(200).json({ ok: true, tweet });
		}
	}
	if (req.method === 'POST') {
		const tweet = await db.tweet.update({
			where: { id: Number(req.query.id) },
			data: { like: req.body.like },
		});

		if (!tweet) {
			res.status(404).json({ ok: false, error: 'Tweet not found' });
		} else {
			res.status(200).json({ ok: true, tweet });
		}
	}
	return res.status(405).end();
}

export default withIronSessionApiRoute(handler, cookieOptions);
