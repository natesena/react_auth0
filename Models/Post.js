const
    Mongoose = require('mongoose')

PostSchema = new Mongoose.Schema({
    title: {type: Object, required: true},
    previewBody: {type: Object, required: true},
    // date: {type: Date, default: Date.now},
    // type: {type: String, required: true},
    // buttonLinks: [
    //     {
    //         title: {type: String},
    //         url: {type: String}
    //     }
    // ],
    // aframePhotoLinks: [
    //     {
    //         url: {type:String},
    //         featured: {type: Boolean}
    //     }
    // ],
    body: {type: Object, required: true}
    // aframeDescription: {type: String, required: true},
    // aframeBody: {type: String, required: true}
})


var Post = Mongoose.model('Post', PostSchema)

module.exports = Post