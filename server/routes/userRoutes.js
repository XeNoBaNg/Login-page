import express from 'express'
import {User} from '../models/userModel.js'
import bcrypt from "bcryptjs"   

const router = express.Router()

router.get('/', async (req,res) => {
    try {
        const users = await User.find({})
        return res.status(200).json({
            count: users.length,
            data: users
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
})

router.post('/register',async (req,res) => {
    try {
        const {email,password} = req.body
        if (
            !req.body.email ||
            !req.body.password 
        ) {
            return res.status(400).send({message:"send all required fields."})
        }

        const saltRound = 10
        const salt = await bcrypt.genSalt(saltRound)
        const bcryptPassword = await bcrypt.hash(password, salt)

        const newUser = {
            email: email,
            password: bcryptPassword
        }
        const users = await User.create(newUser)
        return res.status(201).send(users)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
})

router.post('/login', async (req,res) => {
    try {
        const {email,password} = req.body
        
        if (
            !req.body.email ||
            !req.body.password 
        ) {
            return res.status(400).send({message:"send all required fields."})
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).send({ message: "Email doesn't exist. Please register." })
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return res.status(401).send({ message: "Invalid email or password." })
        }

        const [userName, trash] = email.split('@')

        res.status(200).send({ message: "Login successful!", userName})

    } catch (err) {
        console.log(err.message)
        res.status(500).send({message:error.message})
    }
})

export default router