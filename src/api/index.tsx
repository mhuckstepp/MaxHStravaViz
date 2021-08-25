import axios from "axios";

let stravaClientID = process.env["REACT_APP_STRAVA_CLIENTID"]
let strava_Redirect = process.env["REACT_APP_STRAVA_REDIRECT_URI"]

console.log(strava_Redirect);


export const authLink = `https://www.strava.com/oauth/authorize?client_id=${stravaClientID}&redirect_uri=${strava_Redirect}&response_type=code&scope=read`

export const tokenClient = axios.create({
    baseURL: "https://www.strava.com/oauth",
    timeout: 3000
});

const apiClient = axios.create({
    baseURL: "https://www.strava.com/api/v3",
    timeout: 3000
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export { apiClient };