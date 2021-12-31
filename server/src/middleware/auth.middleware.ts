import { Request, Response, NextFunction } from "express";
import { User } from "../fabric/user/userInterface";
import * as jwt from "jsonwebtoken"
import { queryUser } from "../fabric/user/user.fabric";
const jwt_secret = "blockchaintech";
// export async function Authentication (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ){
//     try{
//         const authHeader = req.headers['authorization'];
//         const token = authHeader && authHeader.split(" ")[1];
//         if(token == null) return res.status(401);
//         const user: any = await jwt.verify(token, jwt_secret as string)
//         const queryString: any ={};
//         queryString.selector={
//             id: user.id,
//             docType: "user"
//         }
//         const rs = await queryUser(user.id, JSON.stringify(queryString));
//         if(rs.length==0) return res.sendStatus(403);
//         req.user = user;
//         next();
//     }
//     catch(err){
//         console.log(err);
//         res.sendStatus(401);
//     }
// }


export async function Authentication(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> {
    try {
        const authHeader  = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (token == null) return res.sendStatus(401); 
        const user: any = jwt.verify(token, jwt_secret as string);
        const queryString: any = {};
        queryString.selector = {
            docType: "user",
            id: user.id,
        };
        const result = await queryUser(user.id, JSON.stringify(queryString));
        if (result.length === 0) return res.sendStatus(401);

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(401);
    }
}