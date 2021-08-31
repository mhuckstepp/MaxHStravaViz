interface StravaUserInfo {
    id: number,
    username: string | undefined,
    resource_state: number,
    firstname: string | undefined,
    lastname: string,
    bio: string,
    city: string,
    state: string,
    country: null,
    sex: string,
    premium: boolean,
    summit: boolean,
    created_at: string,
    updated_at: string,
    badge_type_id: number,
    weight: number,
    profile_medium: string,
    profile: string,
    friend: null,
    follower: null
}

interface StravaData {
    recent_run_totals: {
        count: string,
        distance: string,
        moving_time: string,
        elevation_gain: string
    }
}