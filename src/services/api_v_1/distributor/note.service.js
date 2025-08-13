import { ObjectId } from "mongodb";
import { COLLECTION_NAMES, RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../../config/constants.js";
import { RESPONSE } from "../../../helpers/response.js";
import moment from "moment-timezone";
import { aggregate, findOne, insertOne, updateOne } from "../../../../config/dbMethods.js";

export const noteDetail = async ({ type, _id, createdBy, distributorId }) => {
    try {
        let response = RESPONSE;
        const note_params = {
            isDeleted: false
        };
        let project = {};

        if (type === 'id') {
            note_params._id = new ObjectId(_id);
        } else if (type === 'createdBy') {
            note_params.createdBy = new ObjectId(createdBy);
            note_params.distributorId = new ObjectId(distributorId);
            note_params._id = new ObjectId(_id);
        } else if (type === 'limited_detail') {
            note_params._id = new ObjectId(_id);
            project = {
                _id: 1,
                content: 1,
                distributorId: 1,
                createdBy: 1
            };
        };
        const note_details = await findOne(COLLECTION_NAMES.DISTRIBUTOR_NOTE_COLLECTION, note_params, project);
        if (note_details) {
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.NOTE_DETAILS_FETCHED,
                statusCode: RESPONSE_CODES.GET,
                data: note_details
            };
        } else {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.NO_DATA_FOUND,
                statusCode: RESPONSE_CODES.NOT_FOUND,
                data: {}
            };
        };
        return response;
    } catch (error) {
        throw {
            status: 0,
            message: error.message,
            statusCode: RESPONSE_CODES.ERROR,
            data: {}
        };
    };
};

export const addNoteService = async ({ content, distributorId, createdBy }) => {
    try {
        let response = RESPONSE;
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        distributorId = new ObjectId(distributorId);
        createdBy = new ObjectId(createdBy);
        const result = await insertOne(COLLECTION_NAMES.DISTRIBUTOR_NOTE_COLLECTION, {
            content,
            distributorId: new ObjectId(distributorId),
            createdBy: new ObjectId(createdBy),
            isDeleted: false,
            createdAt: currentTime,
            updatedAt: currentTime
        });
        if (result.acknowledged) {
            await updateOne(COLLECTION_NAMES.DISTRIBUTOR_COLLECTION, { _id: distributorId, createdBy }, { $inc: { notes: 1 } });
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.NOTE_ADDED,
                statusCode: RESPONSE_CODES.POST,
                data: { insertedId: result.insertedId }
            };
        } else {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.FAILED_TO_ADD_NOTE,
                statusCode: RESPONSE_CODES.BAD_REQUEST,
                data: {}
            };
        };
        return response;
    } catch (error) {
        throw {
            status: 0,
            message: error.message,
            statusCode: RESPONSE_CODES.ERROR,
            data: {}
        };
    };
};

export const noteListingService = async ({ page, limit, distributorId, createdBy }) => {
    try {
        let response = RESPONSE;
        let skip = (page - 1) * limit;
        let pipeline = [
            {
                $match: {
                    createdBy: new ObjectId(createdBy),
                    distributorId: new ObjectId(distributorId)
                }
            },
            {
                $lookup: {
                    from: "Users",
                    let: { targetUserId: "$createdBy" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$_id", "$$targetUserId"] },
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                name: 1
                            }
                        }
                    ],
                    as: "createdBy"
                }
            },
            {
                $unwind: "$createdBy"
            },
            { $skip: skip },
            { $limit: limit }
        ];

        const result = await aggregate(COLLECTION_NAMES.DISTRIBUTOR_NOTE_COLLECTION, pipeline);
        response = {
            status: 1,
            message: RESPONSE_MESSAGES.FETCHED,
            statusCode: RESPONSE_CODES.GET,
            data: result
        };
        return response;
    } catch (error) {
        throw {
            status: 0,
            message: error.message,
            statusCode: RESPONSE_CODES.ERROR,
            data: {}
        };
    };
};

export const deleteNoteService = async ({ createdBy, distributorId, noteId }) => {
    try {
        let response = RESPONSE;
        createdBy = new ObjectId(createdBy);
        distributorId = new ObjectId(distributorId);
        noteId = new ObjectId(noteId);
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        let result = await updateOne(COLLECTION_NAMES.DISTRIBUTOR_NOTE_COLLECTION, { _id: noteId, createdBy, distributorId }, {
            $set: {
                isDeleted: true,
                updatedAt: currentTime
            }
        });
        if (result.matchedCount === 0) {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.NO_DATA_FOUND,
                statusCode: RESPONSE_CODES.NOT_FOUND,
                data: {}
            };
        } else {
            await updateOne(COLLECTION_NAMES.DISTRIBUTOR_COLLECTION, { _id: distributorId, createdBy }, { $inc: { notes: -1 } });
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.NOTE_DELETED,
                statusCode: RESPONSE_CODES.GET,
                data: {}
            };
        };
        return response;
    } catch (error) {
        throw {
            status: 0,
            message: error.message,
            statusCode: RESPONSE_CODES.ERROR,
            data: {}
        };
    };
};
