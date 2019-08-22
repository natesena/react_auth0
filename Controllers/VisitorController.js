const   
    Visitor = require('../Models/Visitor.js')

module.exports = {
    find:(req,res)=>{
        var ip = req.headers['x-forwarded-for'] || 
            req.connection.remoteAddress || 
            req.socket.remoteAddress ||
            (req.connection.socket ? req.connection.socket.remoteAddress : null);
        console.log(ip)
        if(ip){
            Visitor.findById(ip, (err, visitor)=>{
                err
                ?((err)=>{
                    console.log(err)
                    //if it did not find one...
                    //Add one!

                    //res.status = bad status
                })
                : (

                    res.send({message: 'success', visitor})
                )
            })
        }
    }
}