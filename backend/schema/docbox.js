const mongoose = require("mongoose")
const docBoxSchema = mongoose.Schema({
    boxName: {
        type: String,
        require: true
    },
    status: {
        type: Number,  // 1 - public, 2 - private
        default: 1
    },
    tags: {
        type: Array,
        default: []
    },
    assignUsers: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model("docbox", docBoxSchema)