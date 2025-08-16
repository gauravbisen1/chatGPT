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

export default router;
