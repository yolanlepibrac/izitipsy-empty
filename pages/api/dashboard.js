import withDb from "../../utils/db";




export default withDb(async (req, res) => {

  res.statusCode =200;
  res.setHeader("content-Type", "application/json");
  res.end();


});
