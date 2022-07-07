const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authSchema = mongoose.Schema({
    username:{
        required:true,
        type:String 
    },
    password:{
        required:true,
        type:String
    },
    confirm_password:{
        require:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
}, { versionKey: false },{
    collection: "auth"
})
authSchema.methods.generateauthtoken = async function () {
    try {
        const t = jwt.sign({ _id: this._id.toString() }, process.env.SECRET)
        this.tokens = this.tokens.concat({ token: t })
        await this.save();
        return t;
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = mongoose.model("auth", authSchema)