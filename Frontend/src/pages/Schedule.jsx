import MatchSchedule from "../components/MatchSchedule";
import Button from "../components/Button";
import Cookies from "js-cookie";

function Schedule() {
  const userRole = Cookies.get("role");

  return (
    <div className="mt-5">
      {userRole === "M" && (
        <div className="flex justify-center space-x-40 md:space-x-80">
          <Button text="Create Match" link="/match/create" />
          <Button text="Create Stadium" link="/stadium/create" />
        </div>
      )}
      <MatchSchedule />
    </div>
  );
}

export default Schedule;
