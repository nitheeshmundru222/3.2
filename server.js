const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Player = require('./models/PlayersModel');
const port=3000;
const connection = 'mongodb://localhost:27017/Nitheesh';
app.use(express.json());
app.listen(port,()=>{
    console.log('Server Running'+port);

});

mongoose.connect(connection)
.then(()=>{
    console.log("connected to db")
}).catch((error)=>{
    console.log("error connecting"+error)
});

app.post('/add',async(req,res) => {
    try {
       const player = await Player.create(req.body);
       res.status(200).json(player);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error})
    }
})

app.put('/update/:id',async(req,res)=>{

 try {
    const {id} = req.params;

    const player = await Player.findByIdAndUpdate(id,req.body)
    if (!player){
        return res.status(404).json({message:`cannot find player ${id}`})

    }
    const updatedplayer = await Player.findById(id,req.body)
    res.status(200).json(updatedplayer);
    
 } catch (error) {
    console.log('Error updating player');
    res.status(500).json({error:message})
    
 }
});

//delete
app.delete('/delete/:id',async(req,res)=>{

    try {
       const {id} = req.params;
   
       const player = await Player.findOneAndDelete(id,req.body)
       if (!player){
           return res.status(404).json({message:`cannot find player ${id}`})
   
       }
       res.status(200).json({message:`deleted`});
       
    } catch (error) {
       console.log('Error updating player');
       res.status(500).json({error:message})
       
    }
});

//most touchdowns
//db.Players.find().sort({touchDowns:-1}.limit(1);
app.get('/mostTouchDowns',async(req,res) =>{

    try {
        const query = await Player.find().sort({touchDowns:-1}).limit(1);
        return res.status(200).json(query);
        
    } catch (error) {
        console.log('could not fetch most touch downs')
        res.status(500).json({error:message})
    }
   
})


//most Rushing Yards
// query db.Players.find().sort({rushingYards:-1}.limit(1);
app.get('/rushingYards',async(req,res) =>{

    try {
        const query = await Player.find().sort({rushingYards:-1}).limit(1);
        return res.status(200).json(query);
        
    } catch (error) {
        console.log('could not fetch most rushing yards')
        res.status(500).json({error:message})
    }
   
})
//Least Rushing Yards
// query  db.Players.find().sort({rushingYards:1}.limit(1);

app.get('/leastYards',async(req,res) =>{

    try {
        const query = await Player.find().sort({rushingYards:1}).limit(1);
        return res.status(200).json(query);
        
    } catch (error) {
        console.log('could not fetch least rushing yards')
        res.status(500).json({error:message})
        
    }
   
})

//List of players sorted from most to few goals made
// query  db.Players.find().sort({goalsMade:-1};

app.get('/goalsMade',async(req,res) =>{

    try {
        const query = await Player.find().sort({goalsMade:-1});
        return res.status(200).json(query);
        
    } catch (error) {
        console.log('could not fetch most to few goals made')
        res.status(500).json({error:message})
        
    }
   
})

//Most Sacks
 // query db.Players.find().sort({sacks:-1}.limit(1);

app.get('/sacks',async(req,res) =>{

    try {
        const query = await Player.find().sort({sacks:-1}).limit(1);
        return res.status(200).json(query);
        
    } catch (error) {
        console.log('could not fetch most sacks')
        res.status(500).json({error:message})
        
    }
   
})










