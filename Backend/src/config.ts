export const EMAIL_PATTERN =
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const PASSWORD_PATTERN =
	/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/; // Minimum eight characters, at least one letter and one number:

export const USERNAME_PATTERN = /^(?:\w{5,31}[a-z0-9])$/i; // Minimum 5 characters, cannot end with special characters, Maximum length is 32 characters.

export const HEX_PATTERN = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/;
export const ACCESS_TOKEN_EXIPIRY = 1000 * 60 * 15; // 15 Minutes
export const REFRESH_TOKEN_EXIPIRY = 1000 * 60 * 60 * 24 * 30; // 30 days

export const DEFAULT_ROLE_ID = "264ed4b4-9312-4766-9c7d-47f8f0ebecd1";
export const ANNOUNCEMENT_CATEGORY_ID = "d0ed3d28-bbe4-4e61-b473-cb0dd2257861";
export const DEFAULT_PROFILE_PICTURE =
	"https://res.cloudinary.com/dm5kc3cci/image/upload/v1672654883/User-128_z1uuhq.png";
export const ADMIN_ROLE_ID = "10b932a3-b8dd-4fc2-82b8-862bdef143bb";

export const UPDATES_CATEGORY_ID = "6979a8a2-90cf-4a49-b28b-22bb8cbb1acf";
export const COMMUNITY_CATEGORY_ID = "2dd34572-2eaf-4f1e-b004-a557220794a7";
export const CONTACT_CATEGORY_ID = "38804f2e-8494-4586-8165-fbabd833f083";

export const DEFAULT_USER_PASSWORD = "defaultUser123";
export const DEFAULT_ADMIN_PASSWORD = "adminuser";

export const ADMIN_USER_ID = "bc86519b-12b6-4dec-96f1-b6888ce023e3";
export const DEFAULT_USER_ID = "07735f98-6f41-458e-b6b9-68755b747b09";
export const DEFAULT_BANNER_ID = "0230347f-d36f-4301-b727-f4aab2837c52";
