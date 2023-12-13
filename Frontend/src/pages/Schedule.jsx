import MatchSchedule from "../components/MatchSchedule";
import Button from "../components/Button";
import Cookies from "js-cookie";

function Schedule() {
  const userRole = Cookies.get("role");

  return (
    <div>
      {userRole === "M" && (
        <div className="float-right sticky mt-5 mr-5">
          <Button text="Create Match" link="/match/create" />
        </div>
      )}

      {userRole === "M" && (
        <div className="float-left sticky mt-5 ml-5">
          <Button text="Create Stadium" link="/stadium/create" />
        </div>
      )}

      <MatchSchedule />
    </div>
  );
}

export default Schedule;
