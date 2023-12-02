const Lounge = () => {
  const arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push([]);
    for (let j = 0; j < 5; j++) {
      arr[i].push(j);
    }
  }

  return <div id="lounge" className="w-full my-8">
    <div className="flex flex-row flex-wrap justify-center items-center w-full">
      {arr.map((row, i) => {
        return <div key={i} className="flex flex-row flex-wrap justify-center items-center h-full w-full">
          {row.map((col, j) => {
            return <div key={j} className="seat h-6 w-6 md:h-10 md:w-10"></div>;
          })}
        </div>;
      })}
    </div>
  </div>;
};

export default Lounge;
