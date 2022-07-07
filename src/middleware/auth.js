const jwt = require("jsonwebtoken")
const auth = require("../model/auth.model")

const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        const verifyUser = jwt.verify(token,process.env.SECRET )
        const user = await auth.findOne({ _id: verifyUser._id })
        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(401).send(error)
    }
}
module.exports = authUser