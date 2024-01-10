const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const documentSchema = mongoose.Schema({
    fileName: {
        type: String,
        require: true
    },
    filePath: {
        type: String,
        require: true
    },
    createdBy: {
        type: ObjectId,
        require: true,
        ref: "user"
    },
    boxId: {
        type: ObjectId,
        require: true,
        ref: "docbox"
    },
    startDate: {
        type: Date,
        default: null
    },
    endDate: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model("documents", documentSchema)