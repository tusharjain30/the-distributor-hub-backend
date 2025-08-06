export const RESPONSE_CODES = {
	GET: 200,
	PUT: 204,
	POST: 201,
	DELETE: 204,
	NOT_FOUND: 404,
	ERROR: 500,
	UNAUTHORIZED: 401,
	BAD_REQUEST: 400,
	ALREADY_EXIST: 409,
	FORBIDDEN: 403,
	INVALID_ACCOUNT_STATUS: 402
};

export const RESPONSE_MESSAGES = {
	USER_DETAIL: "User details fetched",
	REGISTER_SUCCESS: "Register successfully",
	USER_FAILED_TO_REGISTER: "User failed to register",
	USER_DETAILS_FETCHED: "User details fetched",
	USER_UPDATED: "User updated successfully",
	REGISTER_SUCCESS: "Register successfully",
	LOGIN_SUCCESS: "Login successfully",
	FOUND: "Found",
	NO_DATA_FOUND: "Not data found",
	USER_NOT_FOUND: "User not found",
	INVALID_EMAIL: "Invalid Email",
	INVALID_ROLE: "Invalid Role",
	EMAIL_ALREADY_REGISTERED: "Email already registered, please try another email",
	PROFILE_UPDATED: "Profile updated successfully",
	FAILED_TO_UPDATE_PROFILE: "Failed to update profile",
	DISTRIBUTOR_ADDED: "Distributor added",
	FAILED_TO_ADD_DISTRIBUTOR: "Failed to add distributor",
	DISTRIBUTOR_EMAIL_IS_ALREADY_Exists: "Distributor email is already exists, please try another email",
	DISTRIBUTOR_PHONE_NUMBER_IS_ALREADY_Exists: "Distributor phone number is already exists, please try another phone number",
	DISTRIBUTOR_NOT_FOUND: "Distributor not found",
	DISTRIBUTOR_DETAILS_UPDATED: "Distributor details updated",
	FAILED_TO_UPDATE_DISTRIBUTOR_DETAILS: "Failed to update distributor details",
	DISTRIBUTOR_DELETED: "Distributor deleted successfully",
	FETCHED: "Fetched",
	CONTACT_ADDED: "Contact Added",
	FAILED_TO_ADD_CONTACT: "Failed to add contact",
	CONTACT_EMAIL_IS_ALREADY_Exists: "Contact email is already exists, please try another email",
	CONTACT_PHONE_NUMBER_IS_ALREADY_Exists: "Contact phone number is already exists, please try another phone number",
	SUCCESSFULLY_MARKED_CONTACT_AS_PRIMARY: "Successfully marked contact as primary." ,
	CONTACT_NOT_FOUND: "Contact not found",
	CONTACT_DELETED: "Contact deleted successfully",
};


export const COLLECTION_NAMES = {
	USER_COLLECTION: "Users",
	DISTRIBUTOR_COLLECTION: "Distributors",
	DISTRIBUTOR_CONTACT_COLLECTION: "Distributor_Contacts",
	DISTRIBUTOR_NOTE_COLLECTION: "Distributor_Notes",
	DISTRIBUTOR_KEY_ACCOUNT_COLLECTION: "Distributor_Key_Accounts",
	DISTRIBUTOR_INVENTORY_COLLECTION: "Distributor_Inventory",
	DISTRIBUTOR_SALES_DATA_COLLECTION: "Distributor_Sales_Data",
};


