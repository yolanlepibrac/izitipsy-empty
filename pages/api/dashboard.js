

import withDb from "../../utils/db";
import Ticket from "../../schemas/tickets";


export default withDb((req, res) => {

  console.log(res)
  Ticket.find({}, function(err, tickets) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ tickets }));
  });


});
