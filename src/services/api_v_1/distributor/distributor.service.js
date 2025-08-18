import moment from "moment-timezone";
import { ObjectId } from "mongodb";
import { COLLECTION_NAMES, RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../../config/constants.js";
import { aggregateDocuments, findDocuments, findOneDocument, insertDocument, updateDocument } from "../../../../config/dbMethods.js";
import { RESPONSE } from "../../../helpers/response.js";

export const getDistributorDetails = async ({ queryType, _id, email, phone, createdBy, statusId }) => {
    try {
        let response = RESPONSE;
        const queryFilter = {
            isDeleted: false
        };

        if (queryType === 'id') {
            queryFilter._id = new ObjectId(_id);
        } else if (queryType === "createdBy") {
            queryFilter.createdBy = new ObjectId(createdBy);
            queryFilter._id = new ObjectId(_id);
        } else if (queryType === "statusId") {
            queryFilter.statusId = new ObjectId(statusId);
        } else if (queryType === 'phone') {
            queryFilter.phone = phone;
        } else if (queryType === 'limited_detail') {
            queryFilter._id = new ObjectId(_id);
        } else if (queryType === "emailNotEqual") {
            queryFilter.email = email.toLowerCase();
            queryFilter._id = { $ne: new ObjectId(_id) };
        } else if (queryType === "phoneNotEqual") {
            queryFilter.phone = phone;
            queryFilter._id = { $ne: new ObjectId(_id) };
        } else {
            queryFilter.email = email.toLowerCase();
        };
        const distributor_details = await aggregateDocuments(COLLECTION_NAMES.DISTRIBUTORS, [
            {
                $match: queryFilter
            },
            {
                $lookup: {
                    from: COLLECTION_NAMES.STATUS,
                    let: { targetId: "$statusId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [{ $eq: ["$_id", "$$targetId"] }]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                status: 1
                            }
                        }
                    ],
                    as: "status"
                }
            },
            {
                $unwind: {
                    path: "$status",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    phone: 1,
                    website: 1,
                    region: 1,
                    country: 1,
                    status: "$status.status",
                    contacts: 1,
                    notes: 1,
                    sales_data: 1,
                    inventory: 1,
                    key_accounts: 1,
                    annualRevenue: 1
                }
            }
        ]);

        if (distributor_details.length !== 0) {
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.DISTRIBUTOR_FETCH_SUCCESS,
                statusCode: RESPONSE_CODES.GET,
                data: distributor_details
            };
        } else {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.DATA_NOT_FOUND,
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

export const addDistributorService = async ({ createdBy, name, email, phone, website = "", region, country, statusId, annualRevenue }) => {
    try {
        let response = RESPONSE;
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        const result = await insertDocument(COLLECTION_NAMES.DISTRIBUTORS, {
            name,
            email,
            phone,
            website,
            region,
            country,
            statusId: new ObjectId(statusId),
            contacts: 0,
            notes: 0,
            sales_data: 0,
            inventory: 0,
            key_accounts: 0,
            annualRevenue,
            createdBy: new ObjectId(createdBy),
            updatedBy: null,
            isDeleted: false,
            createdAt: currentTime,
            updatedAt: currentTime
        });
        if (result.acknowledged) {
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.DISTRIBUTOR_ADD_SUCCESS,
                statusCode: RESPONSE_CODES.POST,
                data: { insertedId: result.insertedId }
            };
        } else {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.DISTRIBUTOR_ADD_FAILED,
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

export const updateDistributorService = async ({ distributorId, name, email, phone, website = "", region, country, statusId, annualRevenue, updatedBy }) => {
    try {
        let response = RESPONSE;
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        const result = await updateDocument(COLLECTION_NAMES.DISTRIBUTORS, { _id: new ObjectId(distributorId) }, {
            $set: {
                name,
                email,
                phone,
                website,
                region,
                country,
                statusId: new ObjectId(statusId),
                annualRevenue,
                updatedBy: new ObjectId(updatedBy),
                updatedAt: currentTime
            }
        });
        if (result.matchedCount === 0) {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.DATA_NOT_FOUND,
                statusCode: RESPONSE_CODES.NOT_FOUND,
                data: {}
            };
        } else {
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.DISTRIBUTOR_UPDATE_SUCCESS,
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

export const deleteDistributorService = async ({ distributorId }) => {
    try {
        let response = RESPONSE;
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        const result = await updateDocument(COLLECTION_NAMES.DISTRIBUTORS, { _id: new ObjectId(distributorId) }, {
            $set: {
                isDeleted: true,
                updatedAt: currentTime
            }
        });
        if (result.matchedCount === 0) {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.DATA_NOT_FOUND,
                statusCode: RESPONSE_CODES.NOT_FOUND,
                data: {}
            };
        } else {
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.DISTRIBUTOR_DELETE_SUCCESS,
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

export const distributorListingService = async ({ page, limit, search, regionId, statusId, createdBy }) => {
    try {
        let response = RESPONSE;
        let filter = {
            createdBy: new ObjectId(createdBy),
            isDeleted: false
        };
        const skip = (page - 1) * limit;

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { region: { $regex: search, $options: "i" } },
                { country: { $regex: search, $options: "i" } },
            ];
        };

        if (regionId && regionId !== "all") {
            const result = await findOneDocument(COLLECTION_NAMES.REGIONS, {
                _id: new ObjectId(regionId),
                isDeleted: false
            });
            if (result) {
                filter.region = { $regex: result.region, $options: "i" };
            } else {
                filter.region = "";
            };
        };

        if (statusId && statusId.toLowerCase() !== "all") {
            filter.statusId = new ObjectId(statusId);
        };
        const pipeline = [
            {
                $match: filter
            },
            {
                $lookup: {
                    from: COLLECTION_NAMES.STATUS,
                    let: { targetId: "$statusId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [{ $eq: ["$_id", "$$targetId"] }]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                status: 1
                            }
                        }
                    ],
                    as: "status"
                },
            },
            {
                $unwind: {
                    path: "$status",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    phone: 1,
                    website: 1,
                    region: 1,
                    country: 1,
                    status: "$status.status",
                    contacts: 1,
                    notes: 1,
                    sales_data: 1,
                    inventory: 1,
                    key_accounts: 1,
                    annualRevenue: 1
                }
            },
            { $skip: skip },
            { $limit: limit }
        ];

        const result = await aggregateDocuments(COLLECTION_NAMES.DISTRIBUTORS, pipeline);

        response = {
            status: 1,
            message: RESPONSE_MESSAGES.FETCH_SUCCESS,
            statusCode: RESPONSE_CODES.GET,
            data: result,
            pagination: {
                limit,
                page
            }
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

