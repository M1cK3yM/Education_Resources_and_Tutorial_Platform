const mongoose =  require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;