import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {} from 'express-async-errors'
import * as userRepository from '../data/auth.js'
import { config } from '../config.js'

const jwtSecreatKey = config.jwt.secreatKey
const jwtExpireDue = config.jwt.expiresInSec
const bcryptSaltRound = config.bcrypt.saltRounds

export async function signup(req, res){
    const {username, password, name, email, url} = req.body;
    const data = await userRepository.findByUsername(username)
    if(data) return res.status(409).json({message : `${username} exists`})
    const hashed = await bcrypt.hash(password, bcryptSaltRound);
    console.log(hashed)
    const userID = await userRepository.createUser({username, password:hashed, name, email, url});
    const token = createJwtToken(userID);
    res.status(201).json({token, username})
}

export async function login(req, res){
    const {username, password} = req.body;
    const user = await userRepository.findByUsername(username);
    if(!user) return res.status(401).json({msg:'invalid user or pw'})
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword) return res.status(401).json({msg:'invalid user or password'})
    const token = createJwtToken(user.id);
    res.status(200).json({token, username});
}

function createJwtToken(id) {
    return jwt.sign({id}, jwtSecreatKey, {expiresIn:jwtExpireDue})
}

export async function me(req,res,next){
    const user = await userRepository.findById(req.userId);
    if(!user) return res.status(404).json({msg:'user not found'})
    res.status(200).json({token:req.token, username: user.username})
}