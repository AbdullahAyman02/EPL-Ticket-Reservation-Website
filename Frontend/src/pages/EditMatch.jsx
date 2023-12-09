import MatchForm from '../components/MatchForm';

function EditMatch() {
    return (
        <div className="flex items-center justify-center h-screen">
            <MatchForm add={false}/>
        </div>
    );
}

export default EditMatch;