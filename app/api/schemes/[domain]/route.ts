import { NextApiRequest,NextApiResponse } from "next";

export async function GET(req : NextApiRequest,res : NextApiResponse) {
    const domain = req.query.domain;
    res.status(200).json(domain)
}