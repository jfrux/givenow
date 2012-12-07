// ResourceGroup schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

// var getTags = function (tags) {
//   return tags.join(',')
// }

// var setTags = function (tags) {
//   return tags.split(',')
// }
// { "_id" : ObjectId( "50a3e5ac4d40e8190df8f5f0" ),
//   "name" : "12 Volt Accessories",
//   "textpath" : "Home:Fleet and Vehicle Maintenance:Automotive Interior:12 Volt Accessories",
//   "extkey" : "N-cuc",
//   "link" : "http://www.grainger.com/Grainger/12-volt-accessories/automotive-interior/fleet-and-vehicle-maintenance/ecatalog/N-cuc?Ndr=basedimid10071&sst=subset",
//   "hassubcats" : "false",
//   "hasproducts" : "true",
//   "parentkey" : "N-cub" }
var ResourceGroupSchema = new Schema({
    name: { type : String, default : '', trim : true }
  , textpath: { type : String, default : '', trim : true }
  , extkey: { type : String, default : '', trim : true }
  , link: { type : String, default : '', trim : true }
  , hassubcats: { type: String, default : 'false', trim : true }
  , hasproducts: { type: String, default : 'false', trim : true }
  , parentkey  : { type : String, default : '', trim : true }
});

ResourceGroupSchema.path('name').validate(function (name) {
  return name.length > 0
}, 'Resource Group name cannot be blank')


mongoose.model('ResourceGroup', ResourceGroupSchema)
