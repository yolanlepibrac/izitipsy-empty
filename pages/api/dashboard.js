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

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems: 'center' }}>
      <h1 style={{textAlign:"center"}}>SIMPLYK</h1>
      <h2  style={{textAlign:"center"}}>Bénéfices par prix du billet</h2>
      <div style={{width:200, height:10, backgroundColor:"black", alignItems:"center"}}></div>
      <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
        <p>Frais banquaires</p>
        <p style={{fontSize:30, marginLeft:20}}>{bankCharges+" %"}</p>
      </div>

      {columnItem("Montant du billet","Nombre de billets","Bénéfice moyen", true)}

    </div>
  )

});
