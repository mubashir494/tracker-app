import user from '../model/user.js'
import bcryptjs from 'bcryptjs'
import Jwt from 'jsonwebtoken'
import nodemailer from "nodemailer"





export const sendEmail = async (req,res) =>{

    const user  = req.body;

    let testAccount = await nodemailer.createTestAccount();
    const transport = nodemailer.createTransport({
        host : 'smtp.mailtrap.io',
        port : 25,
        auth : {
            user : "6bd3d9a404e25a",
            pass : "8471ebba2d47d4"
        }
    })
    let text = `Hello, Following User is trying to request access \n First Name : ${user.firstName} \n Last Name : ${user.lastName} \n Email : ${user.email} \n To authenticate the User click the following link \n ${user.link}`
    let info = await transport.sendMail({
        from: "sender@server.com", // sender address
        to: "admin@server.com", // list of receivers
        subject: "Employee Access Request", // Subject line
        text: text, // plain text body
        html: `<h1>Employee access request</h1>`, // html body
      });

      
      res.status(200).json({"message" : "The email have been Sent for admin confirmation"})
}
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        
        if (!(firstName && lastName && email && password)) {
            return res.status(400).json({ "message": "All input required" })
        }
        const oldUser = await user.findOne({ email: email })
        if (oldUser) {
        
            return res.status(401).json({ "message": "The user already exist" })
        }
        const encyptedPassword = await bcryptjs.hash(password, 10)
        const users = await user.create({
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": encyptedPassword

        })
        
        const token = Jwt.sign({id: users._id ,role : users.role},process.env.ACCESS_TOKEN_SECRET)

        res.status(200).json({ token: token, id: users._id, firstName: firstName, lastName: lastName, email: email, role : users.role ,createdAt: users.createdAt })

    } catch (error) {
        res.status({"message" : error.message})
    }

}

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).json({ "message": "All input required" })
        }
        const users = await user.findOne({ email });
        if (users && (await bcryptjs.compare(password, users.password))) {
            if(users.auth === false){
                res.status(400).json({"message" : "Admin have not accepted your request"})
            }
            else{
       
                const token = Jwt.sign(
                    { id: users._id,role :users.role },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "12h"
                    }
                    );
                    res.status(200).json({ "token": token, id: users._id, "firstName": users.firstName, "lastName": users.lastName, "role" : users.role,"email": users.email, "createdAt": users.createdAt })
                }
        }
        else {
            res.status(400).json({ "message": "invalid credentials" })

        }
    } catch (error) {
        res.status(401).json({"message" : error.message})
    }
}
export const authenticateUser = async (req,res) =>{
    try{
        const {userId} = req.body;
        const users = await user.findByIdAndUpdate(userId,{"auth" : true})
        res.status(200).json(users)
    }
    catch(error){
        res.status(401).json({"message" : error.message})
    }
}
export const getUserById = async (req,res) =>{
    const id  = req.body.id;
    try{
    
        const users = await user.findById(id);
        const resp = {"firstName": users.firstName,"lastName" : users.lastName,"email" : users.email,"auth" : users.auth,"role" : users.role}
        res.status(200).json(resp)

    }catch(error){
        res.status(401).json({"message" : error.message})
    }
}
export const getUserDetails = async (req, res) => {

    const id = req.userId.id;
    try {
        const userDetail = await user.findById(id);
        if (!userDetail) {
            return res.status(401).json({ "message": "user not found" })
        
        }
        else {
            if(userDetail.auth === false){
                return res.status(400).json({"message" : "Admin have not accepted your request"})

            }
            else{
            const userObtained = {
                "id": userDetail._id,
                "firstName": userDetail.firstName,
                "lastName": userDetail.lastName,
                "email": userDetail.email,
                "role" : userDetail.role,
                "createdAt": userDetail.createdAt,
                "auth" : userDetail.auth
            }
            return res.status(200).json(userObtained)
        }}
    } catch (error) {
        res.status(401).json({"message":error.message})
    }
}
