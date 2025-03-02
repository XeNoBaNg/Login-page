import { MongoParseError } from "mongodb"
import mongoose from "mongoose"

const userSchema = mongoose.Schema(
    {
        email: {
            type:String,
            required:true
        },
        password: {
            type:String,
            required:true
        }
    },
    { 
        collection: 'users',
        timestamps: true
    }
)

export const User = mongoose.model('user', userSchema)