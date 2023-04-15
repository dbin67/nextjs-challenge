import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import db from "../../../lib/db";
import { cookieOptions } from "../../../lib/cookieOptions";
import { ResponseType } from "@/lib/types";

declare module "iron-session" {
	interface IronSessionData {
		user?: {
			id: number;
		};
	}
}

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	if (req.method !== "GET") {
		return res.status(405).end();
	}
	if (!req.session.user) {
		return res.status(401).json({ ok: false, error: "Plz log in." });
	}
	const profile = await db.user.findUnique({
		where: { id: req.session.user?.id },
		select: { id: true, email: true },
	});
	try {
		res.json({
			ok: true,
			profile,
		});
	} catch (error) {
		return res.status(500).json({ ok: false, error });
	}
}

export default withIronSessionApiRoute(handler, cookieOptions);
