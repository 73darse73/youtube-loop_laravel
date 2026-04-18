export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
}

export interface LoopSetting {
    id: number;
    user_id: number;
    video_id: string;
    title: string;
    description: string | null;
    is_favorite: boolean;
    start_time: number;
    end_time: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
