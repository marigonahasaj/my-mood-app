export interface Profile {
    emoji: string;
    label: string;
    description: string;
    image: string;
    tone: string;
}

export interface MoodInsights {
    moodLabel: string;
    answers: string[];
}

export interface UserDetails {
    name?: string;
    email?: string;
    ageRange?: string;
    gender?: string;
    sleepQuality?: string;
    energyLevel: number;
    socialConnection?: string;
    mentalClarity?: string;
    moodStability?: string;
    currentFeeling?: string;
    emotionalNeed?: string;
    isAuthenticated?: boolean;
    hasPaid?: boolean;
    skipped?: boolean;
}

export interface FinalDetails {
    moodImprover: string;
    moodImproverDetail: string;
}

export interface FormData {
    profile: Profile;
    moodInsights: MoodInsights;
    userDetails: UserDetails;
    moodIntent: string;
    finalDetails: FinalDetails[];
}

