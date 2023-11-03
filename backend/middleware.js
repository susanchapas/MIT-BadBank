import accounts from "./mongoConnection.js"
import { ObjectId } from "mongodb";

accounts.createIndex({ email: 1}, {unique: true})

export async function pushAccountObj(req, res){
    try {
        let results = await accounts.insertOne(req.body);
        if (!results.insertedId || !results.acknowledged){
            res.status(500).send();
            return
        }
        const insertedObject = await accounts.findOne({_id: results.insertedId})
        if(!insertedObject){
            res.status(500).send();
            return
        }
        res.send(insertedObject)
    } catch(err){
        console.error(err)
        res.status(500).send()
    }
}

export async function validateUserPW(req, res, next){
    try {
        let results = await accounts.findOne({email: req.body.email, password: req.body.password});
        const loggedInObj = {
            _id: results._id,
            name: results.name,
            email: results.email,
            balance: results.balance,
            history: results.history
        }
        if (!loggedInObj){
            res.status(500).send();
            return
        }
        else {
            res.send(loggedInObj)
        }
    } catch(err){
        console.error(err)
        res.status(500).send()
    }
}

export async function updateBalance(req, res){
    try {
        const isDeposit = req.body.type === "deposit"
        const updateDoc = {
            $inc: {
                balance: (isDeposit ? 1 : -1) * req.body.amount,
            },
            $push: {
                history: {
                    $each: [req.body.name + ` ${isDeposit ? "deposited" : "withdrew"} $` + req.body.amount + " " + new Date()],
                    $position: 0
                }
            }
        }
        const result = await accounts.findOneAndUpdate(
            {_id: new ObjectId( req.body._id )}, 
            updateDoc,
            {returnDocument: "after"}
        )
        res.send(result)
    } catch (err){
        console.error(err)
        res.status(500).send()
    }
}

export function deleteAccount(){
    //accounts.findOneAndDelete()
}