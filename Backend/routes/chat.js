import express from "express";
import Thread from "../models/thread.js"
import getOpenAIAPIResponse from "../utils/openai.js"

const router = express.Router();

//test
router.post("/test", async(req,res)=>{
    try {
        const thread = new Thread({
            threadId: "xyz",
            title: "Testing thread"
        });

        const response = await thread.save();
        res.send(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to save in Db"});
    }
});

//get all threads
router.get("/thread", async(req,res)=>{
    try {
        const threads = await Thread.find({}).sort({updatedAt: -1});//-1 desending
        //desending order of updatedAt...most recent data on top
        res.json(threads);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to fetch threads"});
    }
});

//info of particular thread
router.get("/thred/:threadId", async (req,res)=>{
    const {threadId} = req.params;

    try {
        const thread = await Thread.findOne({threadId});
        if (!thread) {
            res.status(404).json({error: " Thread Not Found!"});
        }
        res.json(thread.messages)
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to fetch chat"});
    }
});

//delete
router.delete("/thread/:threadId", async (req,res)=>{
    const {threadId} = req.params;
    try{
        const deleteThread = await Thread.findOneAndDelete({threadId});
        if(!deleteThread){
            res.status(404).json({error: " Thread could Not be Deleted!"});
        }
        res.status(200).json({success: "Thread deleted successfylly!"});
    }catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to delete chat"});
    }
});

//chat route
router.post("/chat", async(req,res)=>{
    const {threadId,message}= req.body;
    //validate through id and message
    if(!threadId || !message){
        res.status(400).json({error: "missing required fields"});
    }

    try {
        let thread = await Thread.findOne({threadId});
        //if thread already not exist, create new thread and store msg on it
        if (!thread) {
            //create a new thread in db
            thread = new Thread({
                threadId,
                title: message ,
                messages: [{role: "user", content: message}]
            });
        } 
        //if thread already exist store msg on it
        else {
            thread.messages.push({role: "user", content: message});
        }
        //assistant reply
        const assistantReply = await getOpenAIAPIResponse(message);

        thread.messages.push({role: "assistant", content: assistantReply});
        thread.updatedAt = new Date();
        //save reply on mongodb
        await thread.save();

        res.json({reply: assistantReply});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "something went wrong"});
    }
});

export default router;
