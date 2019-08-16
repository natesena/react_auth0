//controllers require the model!
const   
    Post = require('../Models/Post.js')

module.exports = {
    index: (req,res)=>{
        console.log("INDEX ROUTE HIT")
        Post.find(req.query , (err, Posts)=>{
            console.log('Blog Post Index Route Hit')
            if(err){
                res.send({message: 'failure', err: err.code})
            }
            res.send({ message: 'success', Posts})
        })
    },
    create: (req,res)=>{
        Post.create(req.body, (err,newpost)=>{
            console.log('POST: Post Create Route Hit')
            console.log("req.body: ", req.body)
            if(err){
                console.log("err: ", err)
                res.send({message: 'failure', err: err.code})
            }
            res.send({ message: 'success', newpost})
        })
    },
    show: (req,res)=>{
        console.log("WE IN THE SHOW ROUTE")
        Post.findById(req.params.id, (err, Post)=>{
            if(err){
                res.send({message: 'failure', err: err.code})
            }
            res.send({ message: 'success', Post})
        })
    },
    delete: (req,res)=>{
        console.log('\n POST DELETE ROUTE HIT')
        Post.findByIdAndRemove(req.params.id, (err,Post)=>{
            if(err){
                console.log('\n  failure to delete post')
                res.send({message: 'failure', err: err.code})
            }
            res.send({ message: 'success', Post})
        })
    },
    edit: (req,res)=>{
        Post.findByIdAndUpdate(req.params.id, req.body, (err, updatedPost)=>{
            if(err){
                res.send({message: 'failure', err: err.code})
            }
            res.send({ message: 'success', updatedPost})
        })
    }
}