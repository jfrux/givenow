// comment schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var ActivityObjectSchema = new Schema({
        id: {type: String},
        picture: {type: Schema.ObjectId, default: null},
        displayName: {type: String},
        summary: {type: String},
        content: {type: String},
        url: {type:String},
        published: {type: Date, default: null},
        objectType: {type: String},
        updated: {type: Date, default: null},
        author : {type: Schema.ObjectId, ref: "user"},
        attachments : [{type: Schema.ObjectId, ref: 'activityObject'}],
        upstreamDuplicates : [{type: String, default: null}],
        downstreamDuplicates : [{type: String, default: null}]
    });

mongoose.model('ActivityObject', ActivityObjectSchema)
