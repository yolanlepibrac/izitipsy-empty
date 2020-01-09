import withDb from "../../utils/db";

const bankCharges = 2.9

function columnItem(first, second, third, isLegend){
  return (
    <div id="tableLegend" style={{display:"flex", flexDirection:"row", width:500, justifyContent:"space-between"}}>
      <p style={{fontWeight:isLegend?"bold":null, fontSize:isLegend?18:15}}>{first}</p>
      <p style={{fontWeight:isLegend?"bold":null, fontSize:isLegend?18:15}}>{second}</p>
      <p style={{fontWeight:isLegend?"bold":null, fontSize:isLegend?18:15}}>{third}</p>
    </div>
  )
}


export default withDb(async (req, res) => {

  console.log(res)

});
