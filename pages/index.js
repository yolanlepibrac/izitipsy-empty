

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

  sortTicketsArray = (tickets) => {

    let ticketsSortedByAmount = {}
    let greatestAmount = Math.max(...tickets.map((tickets)=>tickets.amount))
    let amount = greatestAmount + 20 - greatestAmount%20

    while (amount>0) {
      for (var i = 0; i < tickets.length; i++) {
        if(tickets[i].amount>=amount-20 && tickets[i].amount<amount){
          if(!ticketsSortedByAmount[amount]){
            ticketsSortedByAmount[amount] = []
          }
          ticketsSortedByAmount[amount].push(tickets[i])
        }
      }
      amount = amount-20
    }
    console.log(ticketsSortedByAmount)
    return ticketsSortedByAmount
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
    let tabOfTickets = this.sortTicketsArray(this.props.ticketsDb.tickets)
    this.setState({tabOfTickets})
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
        {this.state.tabOfTickets && Object.entries(this.state.tabOfTickets).map(([key, value])=> {
          return (this.columnItem("< "+key, value.length, "3"))
        })}


      </div>
    );
  }
}

HomePage.getInitialProps = async () => {
  const ticketsDb = await (
    await fetch("http://localhost:3000/api/dashboard")
  ).json();
  return { ticketsDb };
};


export default HomePage;
