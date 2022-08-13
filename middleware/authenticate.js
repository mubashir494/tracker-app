import  Jwt  from "jsonwebtoken";
export const authenticate = (req,res,next) =>{
    const head = req.headers["token"]
   console.log(head + " id  auth")
   console.log(req.body)
    if(!head){
        return res.status(403).send("token is required")
    }
    try{
        const decoded = Jwt.verify(head, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded;
    }catch(error){
        return res.status(401).json({"message" : "invalid token"})
    }
    return next()

}

export const authenticateAdmin = (req,res,next) =>{
    const head = req.headers['token']
    if(!head) {
        return res.status(403).send("token is required")
    }
    try{
        const decoded = Jwt.verify(head,process.env.ACCESS_TOKEN_SECRET)
        console.log(decoded)
        if(decoded.role[0] === "ADMIN"){
            next()
        }
        else{
            return res.status(405).json({"message" : "Not authorized"})
        }

    }catch(error){
        return res.status(400).json({"message" : error.message})
    }
}

