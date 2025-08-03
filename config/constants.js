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
	PROFILE_UPDATED: "Profile updated successfully"
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


