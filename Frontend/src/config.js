export const API_URL = "http://localhost:5000";

export const EMAIL_PATTERN =
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const PASSWORD_REQUIREMENT =
	"Minimum eight characters, at least one letter and one number.";
export const PASSWORD_PATTERN =
	/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
export const USERNAME_PATTERN = /^(?:\w{5,31}[a-z0-9])$/i;
export const USERNAME_REQUIREMENT =
	"Minimum 5 characters, cannot end with special characters, Maximum length is 32 characters.";

export const MAX_TITLE_LENGTH = 300;

export const ANNOUNCEMENT_CATEGORY_ID = "d0ed3d28-bbe4-4e61-b473-cb0dd2257861";
export const ANNOUNCEMENT_CATEGORY_NAME = "announcement";

export const TOAST_OPTIONS = {
	duration: 8000,
	position: "bottom-left",
};

export const SETTINGS_ID = "f4a52bb2-29a7-4e6a-9326-f7c2db81127a";
export const MC_API = "https://api.mcsrvstat.us/2/";
export const SERVER_IP = "hypixel.net";
