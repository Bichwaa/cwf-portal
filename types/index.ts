// Nested types and interfaces first for clarity

/**
 * Defines the structure for the mentor's average rating and total count.
 */
export interface Rating {
    average: number;
    count: number;
  }
  

  /**
   * Defines the user object nested within the MentorProfile.
   * Note: The 'id' field appears to be a duplicate of '_id' but is included.
   */
  export interface User {
    _id: string;
    userId?: string; // Custom user ID field (different from MongoDB _id)
    firstName: string;
    lastName: string;
    isOrganization: boolean,
    organizationName?:string,
    email: string;
    password?:string,
    role?: 'mentor' | 'mentee' | 'admin'; // Using a union type for common roles (legacy)
    roles?: Array<{
      _id: string;
      roleId: string;
      name: string;
      code: string;
      permissions?: string[];
      status?: string;
    }>; // Roles array from backend
    googleId?: string;
    facebookId?: string;
    phoneNumber?: string;
    gender?: string;
    dateOfBirth?: string; // ISO 8601 Date String
    nationality?: string;
    country?: string;
    linkedIn?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
    instagram?: string;
    avatar?: string;
    skillsAndInterests?: string[];
    bio?: string;
    createdAt?: string; // ISO 8601 Date String
    lastModifiedAt?: string; // ISO 8601 Date String
    __v: number;
    id?: string;
    // Metadata from backend
    metadata?: {
      gender?: string;
      dateOfBirth?: string;
      nationality?: string;
      countryOfResidence?: string;
      socialLinks?: {
        linkedin?: string;
        twitter?: string;
        facebook?: string;
        youtube?: string;
        instagram?: string;
      };
    };
    // Mentee data from backend
    mentee?: {
      skillsAndInterests?: string[];
      goals?: string[];
      bio?: string;
    };
    // Mentor data from backend
    mentor?: {
      skillsAndInterests?: string[];
      bio?: string;
    };
    // Profile picture can be an ObjectId reference (populated as object with url) or null
    profilePicture?: {
      url?: string;
      attachmentId?: string;
      name?: string;
      fileType?: string;
      size?: number;
      _id?: string;
      buffer?: string; // Edge case: incorrectly saved as buffer
    } | string | null;
  }
  
  /**
   * Defines the main structure for the Mentor Profile object.
   */
  export interface MentorProfile {
    _id: string;
    userId: string;
    specializations: string[];
    yearsOfExperience: number;
    certifications: string[];
    availabilityStatus: 'available' | 'unavailable' | 'on-break'; // Using a union type for status
    languages: string[];
    timeZone: string;
    preferredCommunication: string[];
    hourlyRate: number;
    industries: string[];
    maxMentees: number;
    currentMenteeCount: number;
    rating: Rating;
    createdAt: string; // ISO 8601 Date String
    lastModifiedAt: string; // ISO 8601 Date String
    __v: number;
    user: User;
  }
  