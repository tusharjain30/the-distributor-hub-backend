import moment from "moment-timezone";
import { ObjectId } from "mongodb";
import { RESPONSE } from "../../../../helpers/response.js";
import { COLLECTION_NAMES, RESPONSE_CODES, RESPONSE_MESSAGES } from "../../../../../config/constants.js";
import { aggregateDocuments, findOneDocument, insertDocument, updateDocument } from "../../../../../config/dbMethods.js";

export const getDistributorkeyAccountDetails = async ({ queryType, _id, email, phone, distributorId, createdBy }) => {
    try {
        let response = RESPONSE;
        const queryFilter = {
            isDeleted: false
        };

        if (queryType === 'id') {
            queryFilter._id = new ObjectId(_id);
        } else if (queryType === 'phone') {
            queryFilter.phone = phone;
        } else if (queryType === "distributorId_createdBy") {
            queryFilter._id = new ObjectId(_id);
            queryFilter.distributorId = new ObjectId(distributorId);
            queryFilter.createdBy = new ObjectId(createdBy);
        } else if (queryType === "emailNotEqual") {
            queryFilter.email = email.toLowerCase();
            queryFilter._id = { $ne: new ObjectId(_id) };
        } else if (queryType === "phoneNotEqual") {
            queryFilter.phone = phone;
            queryFilter._id = { $ne: new ObjectId(_id) };
        } else {
            queryFilter.email = email.toLowerCase();
        };
        const pipeline = [
            {
                $match: queryFilter
            },
            {
                $lookup: {
                    from: COLLECTION_NAMES.REGIONS,
                    let: { targetId: "$regionId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $ne: ["$$targetId", null] },
                                        { $eq: ["$_id", "$$targetId"] }
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                region: 1
                            }
                        }
                    ],
                    as: "region"
                }
            },
            {
                $unwind: {
                    path: "$region",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: COLLECTION_NAMES.STATUS,
                    let: { targetId: "$statusId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $ne: ["$$targetId", null] },
                                        { $eq: ["$_id", "$$targetId"] }
                                    ]
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
                $lookup: {
                    from: COLLECTION_NAMES.ADOPTION_LEVELS,
                    let: { targetId: "$adoptionLevelId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $ne: ["$$targetId", null] },
                                        { $eq: ["$_id", "$$targetId"] }
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                level: 1
                            }
                        }
                    ],
                    as: "adoptionLevel"
                }
            },
            {
                $unwind: {
                    path: "$adoptionLevel",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: COLLECTION_NAMES.DISTRIBUTOR_NAMES,
                    let: { targetId: "$distributorNameId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $ne: ["$$targetId", null] },
                                        { $eq: ["$_id", "$$targetId"] }
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                distributor: 1
                            }
                        }
                    ],
                    as: "distributor"
                }
            },
            {
                $unwind: {
                    path: "$distributor",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    contactName: 1,
                    companyName: 1,
                    email: 1,
                    phone: 1,
                    value: 1,
                    region: "$region.region",
                    status: "$status.status",
                    adoptionLevel: "$adoptionLevel.level",
                    lastContact: 1,
                    distributor: "$distributor.distributor",
                    contacts: 1,
                    notes: 1,
                }
            }
        ];
        const account_details = await aggregateDocuments(COLLECTION_NAMES.DISTRIBUTOR_KEY_ACCOUNTS, pipeline);
        if (account_details.length !== 0) {
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.ACCOUNT_FETCH_SUCCESS,
                statusCode: RESPONSE_CODES.GET,
                data: account_details[0]
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

export const addDistributorKeyAccountService = async ({ contactName, companyName, email, phone, value, statusId, regionId, adoptionLevelId, lastContact, distributorNameId, createdBy, distributorId }) => {
    try {
        let response = RESPONSE;
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        createdBy = new ObjectId(createdBy);
        distributorId = new ObjectId(distributorId);
        const accountData = {
            contactName,
            companyName,
            email,
            phone,
            value,
            statusId: new ObjectId(statusId),
            regionId: regionId ? new ObjectId(regionId) : null,
            adoptionLevelId: adoptionLevelId ? new ObjectId(adoptionLevelId) : null,
            lastContact: lastContact ? lastContact : null,
            distributorNameId: distributorNameId ? new ObjectId(distributorNameId) : null,
            createdBy,
            distributorId: new ObjectId(distributorId),
            contacts: 0,
            notes: 0,
            updatedBy: null,
            isDeleted: false,
            createdAt: currentTime,
            updatedAt: currentTime
        };

        const result = await insertDocument(COLLECTION_NAMES.DISTRIBUTOR_KEY_ACCOUNTS, accountData);
        if (result.acknowledged) {
            await updateDocument(COLLECTION_NAMES.DISTRIBUTORS, { _id: distributorId, createdBy }, { $inc: { key_accounts: 1 } });
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.ACCOUNT_ADD_SUCCESS,
                statusCode: RESPONSE_CODES.POST,
                data: { insertedId: result.insertedId }
            };
        } else {
            response = {
                status: 0,
                message: RESPONSE_MESSAGES.ACCOUNT_ADD_FAILED,
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

export const distributorKeyAccountListingService = async ({ createdBy, distributorId, search, regionId, statusId, distributorNameId, page, limit }) => {
    try {
        let response = RESPONSE;

        let filter = {
            distributorId: new ObjectId(distributorId),
            createdBy: new ObjectId(createdBy),
            isDeleted: false
        };

        const skip = (page - 1) * limit;

        if (search) {
            filter.$or = [
                { companyName: { $regex: search, $options: "i" } },
                { contactName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ];
        };

        if (regionId && regionId !== "all") {
            filter.regionId = new ObjectId(regionId);
        };

        if (statusId && statusId !== "all") {
            filter.statusId = new ObjectId(statusId);
        };

        if (distributorNameId && distributorNameId !== "all") {
            filter["distributorNameId"] = new ObjectId(distributorNameId);
        };

        const pipeline = [
            {
                $match: filter
            },
            {
                $lookup: {
                    from: COLLECTION_NAMES.REGIONS,
                    let: { targetId: "$regionId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $ne: ["$$targetId", null] },
                                        { $eq: ["$_id", "$$targetId"] }
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                region: 1
                            }
                        }
                    ],
                    as: "region"
                }
            },
            {
                $unwind: {
                    path: "$region",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: COLLECTION_NAMES.STATUS,
                    let: { targetId: "$statusId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $ne: ["$$targetId", null] },
                                        { $eq: ["$_id", "$$targetId"] }
                                    ]
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
                $lookup: {
                    from: COLLECTION_NAMES.ADOPTION_LEVELS,
                    let: { targetId: "$adoptionLevelId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $ne: ["$$targetId", null] },
                                        { $eq: ["$_id", "$$targetId"] }
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                level: 1
                            }
                        }
                    ],
                    as: "adoptionLevel"
                }
            },
            {
                $unwind: {
                    path: "$adoptionLevel",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: COLLECTION_NAMES.DISTRIBUTOR_NAMES,
                    let: { targetId: "$distributorNameId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $ne: ["$$targetId", null] },
                                        { $eq: ["$_id", "$$targetId"] }
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                distributor: 1
                            }
                        }
                    ],
                    as: "distributor"
                }
            },
            {
                $unwind: {
                    path: "$distributor",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    contactName: 1,
                    companyName: 1,
                    email: 1,
                    phone: 1,
                    value: 1,
                    region: "$region.region",
                    status: "$status.status",
                    adoptionLevel: "$adoptionLevel.level",
                    lastContact: 1,
                    distributor: "$distributor.distributor",
                    contacts: 1,
                    notes: 1,
                }
            },
            { $skip: skip },
            { $limit: limit }
        ];

        const result = await aggregateDocuments(COLLECTION_NAMES.DISTRIBUTOR_KEY_ACCOUNTS, pipeline);

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

export const deleteDistributorKeyAccountService = async ({ distributorId, createdBy, accountId }) => {
    try {
        let response = RESPONSE;
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        distributorId = new ObjectId(distributorId);
        createdBy = new ObjectId(createdBy);
        accountId = new ObjectId(accountId);
        let result = await updateDocument(COLLECTION_NAMES.DISTRIBUTOR_KEY_ACCOUNTS, { _id: accountId, createdBy, distributorId }, {
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
            await updateDocument(COLLECTION_NAMES.DISTRIBUTORS, { _id: distributorId, createdBy }, { $inc: { key_accounts: -1 } });
            response = {
                status: 1,
                message: RESPONSE_MESSAGES.ACCOUNT_DELETE_SUCCESS,
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

export const updateDistributorKeyAccountService = async ({ distributorId, accountId, createdBy, contactName, companyName, email, phone, value, statusId, regionId, adoptionLevelId, lastContact, distributorNameId, updatedBy }) => {
    try {
        let response = RESPONSE;
        const currentTime = parseInt(moment().tz(process.env.TIMEZONE).format("x"));
        const result = await updateDocument(COLLECTION_NAMES.DISTRIBUTOR_KEY_ACCOUNTS, {
            _id: new ObjectId(accountId),
            distributorId: new ObjectId(distributorId),
            createdBy: new ObjectId(createdBy)
        }, {
            $set: {
                contactName,
                companyName,
                email,
                phone,
                value,
                statusId: new ObjectId(statusId),
                regionId: new ObjectId(regionId),
                adoptionLevelId: new ObjectId(adoptionLevelId),
                lastContact,
                distributorNameId: new ObjectId(distributorNameId),
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
                message: RESPONSE_MESSAGES.ACCOUNT_UPDATE_SUCCESS,
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

