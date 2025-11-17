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
    firstName: string;
    lastName: string;
    email: string;
    role: 'mentor' | 'mentee' | 'admin'; // Using a union type for common roles
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
  