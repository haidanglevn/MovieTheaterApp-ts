import { useEffect, useState } from "react";
import { handleGoogleSignIn, auth, googleSignOut } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
import "./Profile.css"

interface Ticket {
  id:number;
  movieName: string;
  uid: string | null;
  rowNo: string;
  seatNo: number;
}
const Profile = () => {
  const [user] = useAuthState(auth);
  const [userTickets, setUserTickets] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/userTicket/`)
    .then((res)=> {
      const tickets = res.data; 
      const userTicketsFilter = tickets.filter((ticket:any)=> ticket.uid === user?.uid);
      setUserTickets(userTicketsFilter);
    })
  }, [user]);

  const showUser = () => {
    if (user) {
      return (
        <>
{/*           <img src={user.photoURL!} alt="" />
 */}          <div>
            <h1>User: {user.displayName}</h1>
            <h1>Email: {user.email}</h1>
          </div>
          { userTickets.length > 0 ?
          <div>
            <p>Your ticket(s) are here:</p>
            <div className="ticket-wrapper">
              {userTickets.map((ticket : Ticket) => {
                return (
                  <div key={ticket.id} className="ticket">
                    <p>Movie: {ticket.movieName}</p>
                    <p>Row: {ticket.rowNo}</p>
                    <p>Seat: {ticket.seatNo}</p>
                  </div>
                )
              })}
            </div>
          </div> : "" }
        </>
      );
    } else {
      return (
        <>
          <h1>No user</h1>
          <button onClick={handleGoogleSignIn}>Log in with google</button>
        </>
      );
    }
  };
  return <div>{showUser()}</div>;
};

export default Profile;
