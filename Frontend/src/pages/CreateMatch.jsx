import MatchForm from "../components/MatchForm";

function CreateMatch() {
    return (
        <div className="flex items-center justify-center h-screen">
            <MatchForm add={true}/>
        </div>
    );
}

export default CreateMatch;