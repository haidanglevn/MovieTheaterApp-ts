let ticketDB = [
 {
    uid: "MPjc3SWDwMN2Vvu7atox5k94R4x2",
    ticket: [
      {
        rowNo: "A",
        seatNo: 1,
      },
    ],
  },
  
];
const uidToFind = "MPjc3SWDwMN2Vvu7atox5k94R4x2";
const matchingTicket = ticketDB.find((ticket) => ticket.uid === uidToFind);
const newTicket= {
      rowNo: "A",
      seatNo: 2,
    };
if (matchingTicket) {
  // The matching ticket object was found
  matchingTicket.ticket.push(newTicket)
  console.log("found one matching", matchingTicket);
} else {
  // No matching ticket object was found
  console.log("No matching ticket found, creating new one");
  ticketDB.push({
    uid : uidToFind,
    ticket: [
      newTicket
    ]
  })
  console.log(ticketDB)
}
