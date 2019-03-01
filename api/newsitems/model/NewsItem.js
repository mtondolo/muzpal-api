const mongoose = require('mongoose');
require('mongoose-type-url');
const Schema = mongoose.Schema;

const NewsItemSchema = new Schema({
    headline: { type: String, required: true },
    story: [{ type: String, required: true }],
    storyUrl: { type: mongoose.SchemaTypes.Url, required: true },
    imageUrl: { type: mongoose.SchemaTypes.Url, required: true },     
});

NewsItemSchema.virtual('created').get( function () { 
    return this._id.getTimestamp();
  });

  NewsItemSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('NewsItem', NewsItemSchema);