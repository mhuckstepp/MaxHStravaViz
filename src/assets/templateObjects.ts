const userInfoTemplate: StravaUserInfo = {
    id: 0,
    username: "",
    resource_state: 0,
    firstname: "",
    lastname: "",
    bio: "",
    city: "",
    state: "",
    country: null,
    sex: "M",
    premium: true,
    summit: true,
    created_at: "",
    updated_at: "",
    badge_type_id: 0,
    weight: 0,
    profile_medium: "",
    profile: "",
    friend: null,
    follower: null
}

const maxUserInfo: StravaUserInfo = {
  id: 20352663,
  username: 'max_huckstepp',
  resource_state: 2,
  firstname: 'Max',
  lastname: 'Huckstepp',
  bio: '',
  city: 'San Francisco',
  state: '',
  country: null,
  sex: 'M',
  premium: true,
  summit: true,
  created_at: '2017-03-09T22:29:12Z',
  updated_at: '2020-10-27T00:46:58Z',
  badge_type_id: 1,
  weight: 74.8427,
  profile_medium: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/20352663/16631638/2/medium.jpg',
  profile: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/20352663/16631638/2/large.jpg',
  friend: null,
  follower: null,
}

const stravaDataTemplate: StravaData  = {
  gotResponse: false,
  recent_run_totals: {
      count: 0,
      distance: 0,
      moving_time: 0,
      elevation_gain: 0
  },
  all_run_totals: {
      count: 0,
      distance: 0,
      moving_time: 0,
      elapsed_time: 0,
      elevation_gain: 0,
  }
}


export {userInfoTemplate, maxUserInfo, stravaDataTemplate}