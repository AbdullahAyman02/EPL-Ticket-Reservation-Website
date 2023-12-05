// import Seat from "../assets/fan_seat.png"
import Seat from "../assets/seat1.png"

const Lounge = () => {
  const arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push([]);
    for (let j = 0; j < 5; j++) {
      arr[i].push(j);
    }
  }

  return (
    <div id="lounge" className="w-full py-8">
      <div className="flex flex-row flex-wrap justify-center items-center w-full">
        {arr.map((row, i) => {
          return (
            <div
              key={i}
              className={`flex flex-wrap justify-center items-center h-12 w-full -translate-y-[${
                i * 22
              }px]`}
            >
              {row.map((col, j) => {
                return (
                  <div
                    key={j}
                    className= "h-10 w-10 md:h-16 md:w-16"
                  >
                    <img src={Seat}></img>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lounge;
