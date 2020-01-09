const mongoose = require("mongoose");



const Schema = mongoose.Schema,
  ticketSchema = new Schema({
    tips: Number, // Pourboire laissé
    amount: Number // Montant du billet
  }),
  Ticket =
    mongoose.modelNames().indexOf("Ticket") == -1
      ? mongoose.model("Ticket", ticketSchema)
      : mongoose.model("Ticket");





export default handler => async (req, res) => {
  const db = mongoose.connection;

  console.log("db.readyState", db.readyState);

  if (db.readyState == 1) return null;

  mongoose.connect("mongodb://applicant:johndoethesuperapplicant0@ds019906.mlab.com:19906/heroku_l6prczn1", { useNewUrlParser: true });


  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function() {
    console.log("We are connected to the DB");
    let tabOfTicket = []
    Ticket.find({}, function(err, ticket) {
    tabOfTicket.push(ticket)

  });

  res.status(200).json({
      "tabOfTicket": tabOfTicket
  })


  });
};
