const Document = require("../schema/document")
const { uploadToAws, deleteFromAws } = require("../utils/awsHelper");
const moment = require("moment")

const uploadFile = async (req, res) => {
    try {
        const files = req.files;
        const { userId, boxId, startDate, endDate } = req.body
        await uploadToAws(userId, files, boxId, startDate, endDate)
        return res.send({ status: 1, response: "Successfully file uploaded" })
    } catch (error) {
        return res.send({ status: 0, response: error.message })
    }
}

const getDocsByDocId = async (req, res) => {
    try {
        const { boxId } = req.body
        let fileData = await Document.find({ boxId })
        return res.send({ status: 1, data: JSON.stringify(fileData) })
    } catch (error) {
        return res.send({ status: 0, response: error.message })
    }
}

const deleteFile = async (req, res) => {
    let checkDocumentExist
    try {
        const { userId, fileName, fileId, role } = req.body
        if (role === 1) {
            checkDocumentExist = await Document.findOne({ _id: fileId })
            if (userId != checkDocumentExist.createdBy) {
                return res.send({ status: 0, response: "Don't have permission to delete this file" })
            }
        }
        await deleteFromAws(userId, fileName, fileId)
        return res.send({ status: 1, response: "Successfully file deleted" })
    } catch (error) {
        return res.send({ status: 0, response: error.message })
    }
}

const getFileById = async (req, res) => {
    try {
        const {fileId} = req.body
        let checkDocumentExist, currentDate = new Date()
        checkDocumentExist = await Document.findOne({ _id: fileId })
        if (checkDocumentExist != null) {
            if (checkDocumentExist.startDate != null) {
                if (new Date(checkDocumentExist.startDate) > currentDate) {
                    return res.send({ status: 0, response: `This document can be view/download only after ${moment(checkDocumentExist.startDate).format("DD/MM/YYYY")}` })
                }
            }
            if (checkDocumentExist.endDate != null) {
                if (new Date(checkDocumentExist.endDate) < currentDate) {
                    return res.send({ status: 0, response: `This document can be download/view only before ${new Date(checkDocumentExist.end)}` })
                }
            }
            return res.send({ status: 1, data: JSON.stringify(checkDocumentExist.filePath) })
        }
        return res.send({ status: 0, response: "Document does not exist" })
    }
    catch (err) {
        return res.send({ status: 0, response: err.message })
    }
}

module.exports = { uploadFile, deleteFile, getDocsByDocId, getFileById }