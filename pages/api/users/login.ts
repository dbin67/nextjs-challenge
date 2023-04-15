import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import db from "../../../lib/db";
import { cookieOptions } from "../../../lib/cookieOptions";
import { ResponseType } from "@/lib/types";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	if (req.method !== "POST") {
		return res.status(405).end();
	}
	const { email } = req.body;
	const user = await db.user.findUnique({
		where: {
			email,
		},
	});
	if (!user) return res.status(404).end();
	req.session.user = {
		id: user.id,
	};
	await req.session.save();
	res.status(200).json({ ok: true });
}

export default withIronSessionApiRoute(handler, cookieOptions);
