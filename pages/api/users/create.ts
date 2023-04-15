import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import { ResponseType } from "@/lib/types";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	if (req.method !== "POST") {
		return res.status(405).end();
	}
	const { name, email, password } = req.body;
	await db.user.create({
		data: {
			name, email, password
		},
	});
	res.status(201).json({ ok: true });
}

export default handler;
