const   
    Visitor = require('../Models/Visitor.js')

module.exports = {
    find:(req,res)=>{
        var ip = req.headers['x-forwarded-for'] || 
            req.connection.remoteAddress || 
            req.socket.remoteAddress ||
            (req.connection.socket ? req.connection.socket.remoteAddress : null);
        console.log(ip)
        //If we can find an IP ADDRESS, lets see if they are in our records
        var errList = []

        Visitor.find({}, (err,visitors)=>{
            if(err){
                res.send({message:'failure', err: err})
            }
            if(ip){
                console.log('Checking if Visitor Exists in DB')
                Visitor.find({ipAddress: ip}, (err, visitor)=>{
                    if(err){
                        errList.push(err)
                    }
                    //do something with errList
                    if(visitor.length == 0){//No visitor exists for this IP ADDRESS
                        console.log('creating new Visitor')
                        Visitor.create({ipAddress: ip}, (err, newVisitor)=>{
                            if(err){
                                errList.push(err)
                            }
                            else{   
                                console.log('Success adding new visitor')
                                visitors.push(newVisitor)
                            }
                        })
                    }        
                })
            }
            if(errList.length > 0){
                res.send({message: 'failure', err: errList})
            }
            res.send({message: 'success', visitorCount: visitors.length})
        })

        
        //After we check to see if they are in our records, actually just send how many people we have
        
    }
}