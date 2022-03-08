import * as tweetRepository from '../data/tweets.js'
import { getSocketIO } from '../connection/socket.js';

export async function getTweet(req,res,next){
    const username = req.query.username;
    let data;
    if (username) data = await tweetRepository.getAllByUsername(username)
    else data = await tweetRepository.getAll()
    res.status(200).json(data);
}

export async function getTweetById(req,res,next){
    const id = req.params.id;
    const tweet = await tweetRepository.getById(id)
    if(tweet) res.status(200).json(tweet)
    else res.status(404).json({ message: `tweet ${id} not found`})
}

export async function createTweet(req,res,next){
    const {text} = req.body
    const tweets = await tweetRepository.create(text, req.userId)
    res.status(201).json(tweets)
    getSocketIO().emit('tweets', tweets);
    
}

export async function updateTweet(req,res,next){
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await tweetRepository.getById(id);
    if (!tweet) {
        return res.status(404).json({ message: `Tweet not found: ${id}` });
    }
    if (tweet.userId !== req.userId) {
        return res.sendStatus(403);
    }
    const updated = await tweetRepository.update(id, text);
    res.status(200).json(updated);
}

export async function deleteTweet(req,res,next){
    const id = req.params.id;
    const tweet = await tweetRepository.getById(id);
    if (!tweet) {
        return res.status(404).json({ message: `Tweet not found: ${id}` });
    }
    if (tweet.userId !== req.userId) {
        return res.sendStatus(403);
    }
    await tweetRepository.remove(id);
    res.sendStatus(204);
}