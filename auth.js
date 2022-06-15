const jwt = require(`jsonwebtoken`);

const secret = "UserAPI";

module.exports = {
    
    createAccessToken: (user) => {
        const data = {
            id: user._id,
            email : user.email,
            isAdmin : user.isAdmin
        }

        return jwt.sign(data, secret, {});
    },

    verify: (req,res,next) => {
        let token = req.headers.authorization;

        if(typeof token !== `undefined`){
            token = token.slice(7, token.length);
            console.log(token); 

            return jwt.verify(token, secret, (err, data) => {
                if(err){
                    return res.send({auth : `failed`});
                }
                else{
                    next();
                }
            })
        }
        else{
            return res.send({auth : `failed`})
        }
    },

    decode: (token) => {
        if(typeof token !== `undefined`){
            token = token.slice(7, token.length);

            return jwt.verify(token, secret, (err, data) => {
                if(err){
                    return null;
                }
                else{
                    return jwt.decode(token, {complete:true}).payload
                }
            })
        }
        else{
            return null;
        }
    }
}