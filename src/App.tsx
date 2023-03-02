import { FC, useState } from "react";
import "./App.css";
import seatMapArray from "./seatMap.json"

interface Seat {
  rowNo: string;
  seatNo: number;
  name: string;
  available: boolean;
}

interface Row {
  rowName: string;
  rowSeats: Seat[];
}

type SeatMap = Row[];

const App: FC = () => {
  const [seatData, setSeatData] = useState<SeatMap>(seatMapArray);
  const [chosenSeat, setChosenSeat] = useState<Partial<Seat>>();
  
  const chosenSeatRender = () => {
    if (chosenSeat) {
      return (
        <div>
          <h1>Your chosen seat: </h1>
          <h2>Row: {chosenSeat!.rowNo}</h2>
          <h2>Seat: {chosenSeat!.seatNo}</h2>
          <h2>This seat is available to buy!</h2>
          <button>Buy ticket</button>
        </div>
      );
    }
  };

  const showChosenSeat = (chosenSeat: Seat): void => {
    console.log("seat data", chosenSeat);
    setChosenSeat(chosenSeat);
  };

  return (
    <div className="App">
      <h1>Seat Map for Movie theater</h1>
      <div className="screen">
        SCREEN
      </div>
      <div className="seat-map-wrapper">
        {seatData.map((item) => {
          return (
            <div className="row" key={`${item.rowName}-${item.rowSeats}`}>
              <span className="row-number">Row: {item.rowName}</span>
              {item.rowSeats.map((seat) => {
                if (seat.available) {
                  return (
                    <div
                      className="seat available"
                      onClick={() => showChosenSeat(seat)}
                      key={`${seat.rowNo}-${seat.seatNo}`}
                    >
                      <span className="material-symbols-outlined">chair</span>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="seat unavailable"
                      key={`${seat.rowNo}-${seat.seatNo}`}
                    >
                      <span className="material-symbols-outlined">chair</span>
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
      <div className="seatInfo">{chosenSeatRender()}</div>
    </div>
  );
};

export default App;
