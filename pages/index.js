

import fetch from 'isomorphic-unfetch'
import React from "react";

const bankCharges = 2.9
const res = [
  {price : "<20", number:220},
  {price : "<40", number:320}
 ]



class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  columnItem = (first, second, third, isLegend) => {
    return (
      <div id="tableLegend" style={{display:"flex", flexDirection:"row", width:500, justifyContent:"space-between"}}>
        <p style={{fontWeight:isLegend?"bold":null, fontSize:isLegend?18:15, textAlign:"center"}}>{first}</p>
        <p style={{fontWeight:isLegend?"bold":null, fontSize:isLegend?18:15, textAlign:"center"}}>{second}</p>
        <p style={{fontWeight:isLegend?"bold":null, fontSize:isLegend?18:15, textAlign:"center"}}>{third}</p>
      </div>
    )
  }

  componentDidMount = () => {
    console.log(this.props.tickets)
  }

  click = () => {
    console.log("click")
  }


  render() {
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems: 'center' }}>
        <h1 style={{textAlign:"center"}} onClick={this.click}>SIMPLYK</h1>
        <h2  style={{textAlign:"center"}}>Bénéfices par prix du billet</h2>
        <div style={{width:200, height:10, backgroundColor:"black", alignItems:"center"}}></div>
        <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
          <p>Frais banquaires</p>
          <p style={{fontSize:30, marginLeft:20}}>{bankCharges+" %"}</p>
        </div>

        {this.columnItem("Montant du billet","Nombre de billets","Bénéfice moyen", true)}
        {res.map((item)=> {
          return (this.columnItem(item.price, item.number, "3"))
        })}


      </div>
    );
  }
}

HomePage.getInitialProps = async () => {
  const tickets = await (
    await fetch("http://localhost:3000/api/dashboard")
  ).json();
  return { tickets };
};


export default HomePage;
