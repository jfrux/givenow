// Resource schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

// var setTags = function (tags) {
//   return tags.split(',')
// }
// { "_id" : ObjectId( "50a3e5c04d40e8190df90ceb" ),
//   "name" : ".035X.75X.086X.25X48 SS HINGE",
//   "details" : "Hinge, Continuous, Bearing Type Plain, Material Type 304 Stainless Steel, Finish 2B Mill Finish, Height 4 ft., Length 4 ft., Width 3/4 In.",
//   "price" : 0,
//   "link" : "http://www.grainger.com/Grainger/MARLBORO-Hinge-4PNF3",
//   "img" : "http://images.grainger.com/B372_52/images/products/100x100/Hinge-4PB40_AS01.JPG",
//   "extkey" : "4PNF3",
//   "catkey" : "N-9bq" }
var ResourceSchema = new Schema({
    name: { type : String, default : '', trim : true }
  , details: { type : String, default : '', trim : true }
  , price: { type : String, default : '0.00', trim : true }
  , link: { type : String, default : '', trim : true }
  , img: { type: String, default : '', trim : true }
  , extkey: { type: String, default : '', trim : true }
  , catkey  : { type : String, default : '', trim : true }
  , user: {type : Schema.ObjectId, ref : 'User'}
  , approved  : { type : Boolean, default : false }
});

ResourceSchema.path('name').validate(function (name) {
  return name.length > 0
}, 'Resource name cannot be blank')

mongoose.model('Resource', ResourceSchema)
