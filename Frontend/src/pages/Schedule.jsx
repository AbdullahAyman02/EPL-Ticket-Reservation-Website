import MatchSchedule from "../components/MatchSchedule";
import Button from "../components/Button";

function Schedule() {
    return (
        <div>
            <div className="float-right sticky mt-5 mr-5">
                <Button text="Create Match" link="/match/create"/>
            </div>
            <MatchSchedule />
        </div>
    );
}

export default Schedule;