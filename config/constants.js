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
	// User
	USER_FETCH_SUCCESS: "User details fetched successfully",
	USER_REGISTER_SUCCESS: "User registered successfully",
	USER_REGISTER_FAILED: "User registration failed",
	USER_UPDATE_SUCCESS: "User updated successfully",
	USER_UPDATE_FAILED: "Failed to update user",
	USER_NOT_FOUND: "User not found",
	USER_EMAIL_EXISTS: "Email already registered, please try another email",
	USER_INVALID_EMAIL: "Invalid email address",
	USER_INVALID_ROLE: "Invalid role",

	// Auth
	LOGIN_SUCCESS: "Login successful",

	// Generic
	DATA_FOUND: "Data found",
	DATA_NOT_FOUND: "No data found",
	FETCH_SUCCESS: "Data fetched successfully",
	FETCH_FAILED: "Failed to fetch data",

	// Distributor
	DISTRIBUTOR_FETCH_SUCCESS: "Distributor details fetched successfully",
	DISTRIBUTOR_ADD_SUCCESS: "Distributor added successfully",
	DISTRIBUTOR_ADD_FAILED: "Failed to add distributor",
	DISTRIBUTOR_UPDATE_SUCCESS: "Distributor details updated successfully",
	DISTRIBUTOR_UPDATE_FAILED: "Failed to update distributor details",
	DISTRIBUTOR_DELETE_SUCCESS: "Distributor deleted successfully",
	DISTRIBUTOR_NOT_FOUND: "Distributor not found",
	DISTRIBUTOR_EMAIL_EXISTS: "Distributor email already exists, please try another",
	DISTRIBUTOR_PHONE_EXISTS: "Distributor phone number already exists, please try another",

	// Contact
	CONTACT_FETCH_SUCCESS: "Contact details fetched successfully",
	CONTACT_ADD_SUCCESS: "Contact added successfully",
	CONTACT_ADD_FAILED: "Failed to add contact",
	CONTACT_DELETE_SUCCESS: "Contact deleted successfully",
	CONTACT_NOT_FOUND: "Contact not found",
	CONTACT_EMAIL_EXISTS: "Contact email already exists, please try another",
	CONTACT_PHONE_EXISTS: "Contact phone number already exists, please try another",
	CONTACT_MARK_PRIMARY_SUCCESS: "Contact marked as primary successfully",
	CONTACT_PRIMARY_DELETE_ERROR: "Assign another primary contact before deleting the current one",

	// Note
	NOTE_FETCH_SUCCESS: "Note details fetched successfully",
	NOTE_ADD_SUCCESS: "Note added successfully",
	NOTE_ADD_FAILED: "Failed to add note",
	NOTE_DELETE_SUCCESS: "Note deleted successfully",
	NOTE_FETCH_SUCCESS: "Note details fetched successfully",
	NOTE_NOT_FOUND: "Note not found",

	// Account
	ACCOUNT_FETCH_SUCCESS: "Account details fetched successfully",
	ACCOUNT_ADD_SUCCESS: "Account added successfully",
	ACCOUNT_ADD_FAILED: "Failed to add account",
	ACCOUNT_UPDATE_SUCCESS: "Account details updated successfully",
	ACCOUNT_DELETE_SUCCESS: "Account deleted successfully",
	ACCOUNT_NOT_FOUND: "Account not found",
	ACCOUNT_EMAIL_EXISTS: "Account email already exists",
	ACCOUNT_PHONE_EXISTS: "Account phone number already exists",
	ACCOUNT_FETCH_SUCCESS: "Account details fetched successfully",
	ACCOUNT_CONTACT_FETCH_SUCCESS: "Account contact details fetched successfully",

	// Region
	REGION_INVALID_ID: "Invalid region id",
	REGION_FETCH_SUCCESS: "Region details fetched successfully",

	// Status
	INVALID_STATUS_ID: "Invalid Status id",
	STATUS_FETCH_SUCCESS: "Status details fetched successfully",
	
	// Adoption Levels
	INVALID_LEVEL_ID: "Invalid adoption level id",
	ADOPTION_LEVEL_FETCH_SUCCESS: "Adoption level details fetched successfully",

	// distributor names
	INVALID_DISTRIBUTOR_NAME_ID: "Invalid distributor name id",
	DISTRIBUTOR_NAME_FETCH_SUCCESS: "distributor name details fetched successfully",
};

export const COLLECTION_NAMES = {
	USERS: "users",
	DISTRIBUTORS: "distributors",
	DISTRIBUTOR_CONTACTS: "distributor_contacts",
	DISTRIBUTOR_NOTES: "distributor_notes",
	DISTRIBUTOR_KEY_ACCOUNTS: "distributor_key_accounts",
	KEY_ACCOUNT_CONTACTS: "key_account_contacts",
	KEY_ACCOUNT_NOTES: "key_account_notes",
	DISTRIBUTOR_INVENTORY: "distributor_inventory",
	DISTRIBUTOR_SALES: "distributor_sales",
	REGIONS: "regions",
	STATUS: "status",
	ADOPTION_LEVELS: "adoptionLevels",
	DISTRIBUTOR_NAMES: "distributor_names",
};

