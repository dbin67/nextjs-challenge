import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { cookieOptions } from "../../../lib/cookieOptions";
import { ResponseType } from "@/lib/types";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	if (req.method !== "POST") {
		return res.status(405).end();
	}
	if (req.session.user) {
		req.session.user = null;
	}
	await req.session.save();
	res.status(200).json({ ok: true });
}

export default withIronSessionApiRoute(handler, cookieOptions);
