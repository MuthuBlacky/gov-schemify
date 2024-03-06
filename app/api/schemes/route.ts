import {agriculture} from "../../../schemes.js";
export async function GET(req : Request,res : Response) {
    const scheme = []
    for(let index = 0; index < Math.min(5,agriculture.length);index++) {
       scheme.push(agriculture[index])
    }
    console.log(scheme);
    return new Response(JSON.stringify(scheme),{status : 404})
}