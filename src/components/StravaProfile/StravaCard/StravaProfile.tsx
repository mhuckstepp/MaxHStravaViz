import "./StravaProfile.css";
import {
  FaMountain,
  FaRegClock,
  FaArrowUp,
  FaRulerHorizontal,
  FaRunning,
} from "react-icons/fa";
interface Props {
  stravaData: StravaData;
  userInfo: StravaUserInfo;
  isUsersProfile: boolean;
}

const StravaProfile = (props: Props) => {
  const { isUsersProfile, userInfo, stravaData } = props;

  let distance: number = stravaData.recent_run_totals.distance / 1609.34;
  let time: number = stravaData.recent_run_totals.moving_time / 3600;
  let elevation: number = stravaData.recent_run_totals.elevation_gain * 3.28084;
  let everests: number = elevation / 290.32;

  let allDistance: number = stravaData.all_run_totals.distance / 1609.34;
  let allTime: number = stravaData.all_run_totals.moving_time / 3600 / 24;
  let allElevation: number = stravaData.all_run_totals.elevation_gain * 3.28084;
  let allEverests: number = allElevation / 29032;

  return (
    <div className="strava-profile">
      <h1>Hello {userInfo?.firstname || userInfo?.username}</h1>
      {!isUsersProfile ? <h2> See Max's stats below </h2> : null}
      <img alt="prof pic" src={userInfo.profile} />
      <h2> Runs in the last 4 weeks </h2>
      <p>
        <FaRunning size={26} /> {stravaData.recent_run_totals.count} runs
      </p>
      <p>
        {" "}
        <FaRulerHorizontal size={26} /> Distance {distance.toFixed(1)} miles
      </p>
      <p>
        {" "}
        <FaRegClock size={26} /> Exercise time {time.toFixed(1)} hours
      </p>
      <p>
        {" "}
        <FaArrowUp size={26} /> Elevation gain {elevation.toFixed(0)} feet
      </p>
      <p>
        {" "}
        <FaMountain size={26} /> That is only {everests.toFixed(1)}% of the way
        up Everest!{" "}
      </p>
      <h2> All time stats </h2>
      <p>
        <FaRunning size={26} /> {stravaData.all_run_totals.count} runs
      </p>
      <p>
        {" "}
        <FaRulerHorizontal size={26} /> Distance {allDistance.toFixed(1)} miles
      </p>
      <p>
        {" "}
        <FaRegClock size={26} /> Exercise time {allTime.toFixed(1)} days
      </p>
      <p>
        {" "}
        <FaArrowUp size={26} /> Elevation gain {allElevation.toFixed(0)} feet
      </p>
      <p>
        {" "}
        <FaMountain size={26} /> That is {allEverests.toFixed(1)} Everests!{" "}
      </p>
    </div>
  );
};
export default StravaProfile;
