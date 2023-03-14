import axios from "axios";
import { FC, useEffect, useState } from "react";
import seatMapArray from "../seatMap.json";
import "./SeatMap.css";
import { MoviesData } from "./MovieSingle";

interface MoviesDataWithTicket extends MoviesData {
  ticket?: SeatMap;
}
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

interface Props {
  name: string;
  id: number;
}
const SeatMap = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [seatData, setSeatData] = useState<SeatMap>();
  const [chosenSeat, setChosenSeat] = useState<Seat>();

  // fetch test.db, search in movies if there is any with the same name as props.name
  // if yes, check if there is already a ticket property: (case1)
  // -----> yes: fetch that ticket array, show in UI
  // -----> no: take empty array from seatMap.json, push in array as ticket.
  // if no, create new object with props.name, take empty array from seatMap.json,
  // push in array as ticket. (case2)
  useEffect(() => {
    axios.get(`http://localhost:3001/movies/${props.id}`).then((res) => {
      const itemData: MoviesDataWithTicket = res.data;
      console.log("Item data ", itemData);
      if (itemData.hasOwnProperty("ticket")) {
        console.log("this movie have ticket data");
        setSeatData(itemData.ticket);
        setIsLoading(false);
      } else {
        console.log("this movie doesnt have ticket data");
        itemData.ticket = seatMapArray;
        axios
          .put(`http://localhost:3001/movies/${props.id}`, itemData)
          .then((res) => {
            console.log("added default empty seat map ");
          })
          .catch((error) => console.log(error));
        setSeatData(itemData.ticket);
        setIsLoading(false);
      }
    });
  }, []);

  const buyTicket = () => {
    console.log("Ticket info: ", chosenSeat);
    axios.get(`http://localhost:3001/movies/${props.id}`).then((res) => {
      const selectedMovie = res.data;
      const selectedTicket = selectedMovie.ticket;
      const selectedRow = selectedTicket.find(
        (seat: any) => seat.rowName === chosenSeat?.rowNo
      );
      selectedRow.rowSeats.forEach((seat: any) => {
        if (seat.seatNo === chosenSeat?.seatNo) {
          seat.name = chosenSeat?.name;
          seat.available = chosenSeat?.available;
        }
      });
      axios
        .put(`http://localhost:3001/movies/${props.id}`, selectedMovie)
        .then((response) => {
          setSeatData(selectedTicket);
          console.log("Updated ticket data");
        })
        .catch((error) => {
          console.error("Error: cannot update ticket data");
        });
      console.log("Ticket bought succesfully");
    });
  };

  const changeTicketInfo = (nameOnTicket: string) => {
    let ticketInfo = chosenSeat;
    ticketInfo!.name = nameOnTicket;
    ticketInfo!.available = false;
    setChosenSeat(ticketInfo);
    console.log(chosenSeat);
  };

  const chosenSeatRender = () => {
    if (chosenSeat) {
      return (
        <div>
          <div>
            <h1>Your chosen seat: </h1>
            <h2>Row: {chosenSeat!.rowNo}</h2>
            <h2>Seat: {chosenSeat!.seatNo}</h2>
            <h2>This seat is available to buy!</h2>
          </div>
          <form>
            <label htmlFor="ticket-name">
              Enter your name here and press "Buy ticket"
            </label>
            <input
              type="text"
              id="ticket-name"
              onChange={(e) => changeTicketInfo(e.target.value)}
            />
          </form>
          <button onClick={buyTicket}>Buy ticket</button>
        </div>
      );
    }
  };

  const showChosenSeat = (chosenSeat: Seat): void => {
    if (chosenSeat.available) {
      console.log("seat data", chosenSeat);
      setChosenSeat(chosenSeat);
    }
  };

  const renderSeatMap = () => {
    if (seatData) {
      console.log("Movie has seatdata");
      return <h1>Has Data</h1>;
    }
  };

  const renderTicket = () => {
    if (isLoading) {
      return <h1>Page is Loading...</h1>;
    } else {
      return (
        <>
          <h1>Seat Map for {props.name}</h1>
          <div className="screen">SCREEN</div>
          <div className="seat-map-wrapper">
            {seatData!.map((item) => {
              return (
                <div className="row" key={`${item.rowName}-${item.rowSeats}`}>
                  <span className="row-number">Row: {item.rowName}</span>
                  {item.rowSeats.map((seat) => {
                    if (
                      seat.rowNo == chosenSeat?.rowNo &&
                      seat.seatNo == chosenSeat.seatNo
                    ) {
                      return (
                        <div
                          className={`seat chosen available`}
                          onClick={() => showChosenSeat(seat)}
                          key={`${seat.rowNo}-${seat.seatNo}`}
                        >
                          <span className="material-symbols-outlined">
                            chair
                          </span>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className={`seat ${
                            seat.available ? "available" : "unavailable"
                          }`}
                          onClick={() => showChosenSeat(seat)}
                          key={`${seat.rowNo}-${seat.seatNo}`}
                        >
                          <span className="material-symbols-outlined">
                            chair
                          </span>
                        </div>
                      );
                    }
                  })}
                </div>
              );
            })}
          </div>
          <div className="seatInfo">{chosenSeatRender()}</div>
        </>
      );
    }
  };

  return <div className="Ticket">{renderTicket()}</div>;
};

export default SeatMap;
