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
	ADMIN_FAILED_TO_REGISTER: "Admin failed to register",
	ADMIN_DETAILS_FETCHED: "Admin details fetched",
	ADMIN_UPDATED: "Admin updated successfully",
	REGISTER_SUCCESS: "Register successfully",
	LOGIN_SUCCESS: "Login successfully",
	FOUND: "Found",
	NO_DATA_FOUND: "Not data found",
	ADMIN_NOT_FOUND: "Admin not found",
	INVALID_EMAIL: "Invalid Email",
	INVALID_ROLE: "Invalid Role",
	EMAIL_ALREADY_REGISTERED: "Email already registered, please try another email",
	PROFILE_UPDATED: "Profile updated successfully"
};


export const COLLECTION_NAMES = {
	ADMIN_COLLECTION: "Admins",
	DISTRIBUTOR_COLLECTION: "Distributors",
	DISTRIBUTOR_CONTACT_COLLECTION: "Distributor_Contacts",
	DISTRIBUTOR_NOTE_COLLECTION: "Distributor_Notes",
	DISTRIBUTOR_KEY_ACCOUNT_COLLECTION: "Distributor_Key_Accounts",
	DISTRIBUTOR_INVENTORY_COLLECTION: "Distributor_Inventory",
	DISTRIBUTOR_SALES_DATA_COLLECTION: "Distributor_Sales_Data",
};


