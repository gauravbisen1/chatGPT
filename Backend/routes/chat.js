import express from "express";
import Thread from "../models/thread.js"

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
})

export default router;
