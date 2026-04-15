export type UpdateProfilePayload = {
    profile: {
        name: string;
        /**
         * Date of birth in the format YYYY-MM-DD
         */
        dob: `${string}-${string}-${string}`;
        gender: Gender;
    };
    biz?: Partial<{
        cate: BusinessCategory;
        description: string;
        address: string;
        website: string;
        email: string;
    }>;
};

export type UpdateProfileResponse = "";