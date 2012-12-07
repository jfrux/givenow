// comment schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var ActivitySchema = new Schema({
  verb: {type: String, default: null},
  url: {type: String},
  title: {type: String},
  content: {type: String},
  picture: {type: Schema.ObjectId, default: null,ref:'photo'},
  object: {type: Schema.ObjectId, default: null},
  actor:  {type: Schema.ObjectId, ref: 'user', default: null},
  target: {type: Schema.ObjectId, default: null},
  published: { type: Date, default: Date.now},
  updated: { type: Date, default: Date.now},
  inReplyTo: {type: Schema.ObjectId, ref: 'activity'},
  streams: [{type: String, default: []}]
})

mongoose.model('Activity', ActivitySchema)
