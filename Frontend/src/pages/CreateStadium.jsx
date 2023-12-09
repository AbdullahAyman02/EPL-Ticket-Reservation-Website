import StadiumForm from '../components/StadiumForm';

function CreateStadium() {
    return (
        <div className="flex items-center justify-center h-screen">
            <StadiumForm add={true}/>
        </div>
    );
}

export default CreateStadium;