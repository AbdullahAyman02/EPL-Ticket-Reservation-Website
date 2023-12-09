const Ticket = ({
  ticket_no,
  team1_id,
  team2_id,
  team1,
  team2,
  date,
  seat_no,
  stadium,
}) => {
  return (
    <div className=" min-w-fit w-2/3 mt-2">
      <h1 className="bg-blue-950 p-3 rounded-t-md">Ticket</h1>
      <div className="bg-white text-black p-3 rounded-b-md">
        <p>Seat No: {seat_no}</p>
        <p>Ticket No: {ticket_no}</p>
        <p>Match Date: {date}</p>
        <p>Stadium: {stadium}</p>
        <div className="flex justify-around">
          <div>
            <img
              className="max-w-[100px]"
              src={`https://media.api-sports.io/football/teams/${team1_id}.png`}
              alt=""
            />
            <h3>{team1}</h3>
          </div>
          <p className="my-auto text-4xl">vs</p>
          <div>
            <img
              className="max-w-[100px]"
              src={`https://media.api-sports.io/football/teams/${team2_id}.png`}
              alt=""
            />
            <h3>{team2}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
