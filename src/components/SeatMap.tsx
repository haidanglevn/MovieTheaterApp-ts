import axios from "axios";
import { useEffect, useState } from "react";
import seatMapArray from "../seatMap.json";
import "./SeatMap.css";
import { MoviesData } from "./MovieSingle";
import { auth } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, redirect } from "react-router-dom";

interface MoviesDataWithTicket extends MoviesData {
  ticket?: SeatMap;
}
interface Seat {
  rowNo: string;
  seatNo: number;
  name?: string | null;
  uid?: string | null;
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

interface Ticket {
  movieName: string;
  uid: string | null;
  rowNo: string;
  seatNo: number;
}

const SeatMap = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [seatData, setSeatData] = useState<SeatMap>();
  const [chosenSeat, setChosenSeat] = useState<Seat>();
  const [user] = useAuthState(auth);

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
    // change the info of the chosen seat with name, uid and available
    let ticketInfo = chosenSeat;
    ticketInfo!.name = user?.displayName;
    ticketInfo!.uid = user?.uid;
    ticketInfo!.available = false;
    setChosenSeat(ticketInfo);
    console.log("Ticket info: ", chosenSeat);

    // update the change to movies db
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
          seat.uid = chosenSeat?.uid;
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

    //update the change to ticket db
    const newTicket: Ticket = {
      movieName: props.name,
      uid: user!.uid,
      rowNo: chosenSeat!.rowNo,
      seatNo: chosenSeat!.seatNo,
    };

    // this is a patching solution
    axios.post(`http://localhost:3001/userTicket`, newTicket).then((res) => {
      console.log(res);
    });
  };

  // render UI to buy ticket for the chosen seat
  const chosenSeatRender = () => {
    
    if (chosenSeat) {
      return (
        <div>
          <h2>This seat is available to buy!</h2>
          <p>Check your info before click "buy ticket":</p>
          <div>
            <h1>Your chosen seat: </h1>
            <h2>Row: {chosenSeat!.rowNo}</h2>
            <h2>Seat: {chosenSeat!.seatNo}</h2>
          </div>
          <p>Name: {user?.displayName}</p>
          <p>Email: {user?.email}</p>
          <Link to={"/success"} onClick={buyTicket}>
            <button>Buy ticket</button>
          </Link>
        </div>
      );
    }
  };

  // onclick function to only change chosenSeat if it is available
  const showChosenSeat = (chosenSeat: Seat): void => {
    if (chosenSeat.available) {
      setChosenSeat(chosenSeat);
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
