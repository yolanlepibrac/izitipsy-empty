
import getDatabase from "./api/dashboard";

import fetch from 'isomorphic-unfetch'




const bankCharges = 2.9
const res = [
  {price : "<20", number:220},
  {price : "<40", number:320}
 ]

function columnItem(first, second, third, isLegend){
  return (
    <div id="tableLegend" style={{display:"flex", flexDirection:"row", width:500, justifyContent:"space-between"}}>
      <p style={{fontWeight:isLegend?"bold":null, fontSize:isLegend?18:15, textAlign:"center"}}>{first}</p>
      <p style={{fontWeight:isLegend?"bold":null, fontSize:isLegend?18:15, textAlign:"center"}}>{second}</p>
      <p style={{fontWeight:isLegend?"bold":null, fontSize:isLegend?18:15, textAlign:"center"}}>{third}</p>
    </div>
  )
}


function HomePage({ db }) {

  function click(){
    console.log(db)
  }


  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems: 'center' }}>
      <h1 style={{textAlign:"center"}} onClick={click}>SIMPLYK</h1>
      <h2  style={{textAlign:"center"}}>Bénéfices par prix du billet</h2>
      <div style={{width:200, height:10, backgroundColor:"black", alignItems:"center"}}></div>
      <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
        <p>Frais banquaires</p>
        <p style={{fontSize:30, marginLeft:20}}>{bankCharges+" %"}</p>
      </div>

      {columnItem("Montant du billet","Nombre de billets","Bénéfice moyen", true)}
      {res.map((item)=> {
        return (columnItem(item.price, item.number, "3"))
      })}


    </div>
  )

};

HomePage.getInitialProps = async ({ req }) => {

  return {db : getDatabase()}
  /*
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const json = await res.json()
  console.log(json)
  return { db: json }
  */
}




export default HomePage
