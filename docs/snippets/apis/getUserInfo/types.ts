export type ProfileInfo = User;

export type UserInfoResponse = {
    unchanged_profiles: Record<string, unknown>;
    phonebook_version: number;
    changed_profiles: Record<string, ProfileInfo>;
};