const mongoose = require('mongoose');

const playerSchema = mongoose.Schema(
    {
        playerName:{
            type: String

        },
        touchDowns:{
            type : Number
        },
        rushingYards:{
            type:Number
        },
        sacks:{
            type:Number
        },
        madeGoals:{
            type:Number
        },
        missedGoals:{
            type:Number
        },
        catchesMade:{
            type:Number
        }
    },
    {collection: 'Players' }


)



const Player = mongoose.model('Player',playerSchema);
module.exports=Player;

