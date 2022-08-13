import express from "express";
import { authenticateAdmin,authenticate } from "../middleware/authenticate.js";
import { register,login,getUserDetails,sendEmail,getUserById,authenticateUser } from "../controller/user.js";


const router = express.Router();

router.post('/login',login)
router.post('/register',register)
router.post('/sendEmail',sendEmail)


router.post('/',authenticate,getUserDetails)


router.post('/getUserById',getUserById)
router.post('/authenticateUser',authenticateUser)


export default router