

import fetch from 'isomorphic-unfetch'
import React from "react";
//import Layout from '../components/MyLayout';
import Link from 'next/link';

const res = [
  {price : "<20", number:220},
  {price : "<40", number:320}
 ]



class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bankCharges : 2.9,
      rangeOfValues:20
    };
  }

  componentDidMount = () => {
    let tabOfTickets = this.sortTicketsArray(this.props.ticketsDb.tickets)
    this.setState({tabOfTickets})
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


  getBenefice = (ticket) => {
    let tips = ticket.tips ? ticket.tips : 0
    return  tips - this.state.bankCharges/100 * ticket.amount
  }
  getAverage = (array) => {
    let sum = 0
    for (var i = 0; i < array.length; i++) {
      sum += array[i]
    }
    return Math.round(sum/array.length*100)/100
  }

  setBankCharges = (value) => {
    this.setState({bankCharges :value})
    let tabOfTickets = this.sortTicketsArray(this.props.ticketsDb.tickets)
    this.setState({tabOfTickets})
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

  setValue = (value) => {
    this.setState({rangeOfValues : value})
  }


  render() {
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems: 'center' }}>
        <h1 style={{textAlign:"center"}} onClick={this.click}>SIMPLYK</h1>
        <h2  style={{textAlign:"center"}}>Bénéfices par prix du billet</h2>
        <input type="number" min="0" max="10" step="0.1" value={this.state.bankCharges} onChange={e => this.setBankCharges(e.target.value)}
        style={{position:"absolute",top:20,right:20,display:"flex",flexDirection:"row",justifyContent:"flex-end",alignItems:"center",width:100,height: 20,fontSize: 16,paddingLeft:10, borderRadius:5,}}></input>

        <div id="buttonIntervalContainer">
          {
            [5,10,20,50,100].map((value)=>{
            return (
              <button className="buttonInterval" style={{backgroundColor:this.state.rangeOfValues===value ? "rgba(53,117,65)":null}} onClick={() => this.setValue(value)}>{value}
              </button>)
            })
          }

        </div>

        <div style={{width:200, height:10, backgroundColor:"black", alignItems:"center"}}></div>
        <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
          <p>Frais banquaires</p>
          <p style={{fontSize:30, marginLeft:20}}>{this.state.bankCharges+" %"}</p>
        </div>

        {this.columnItem("Montant du billet","Nombre de billets","Bénéfice moyen", true)}
        {this.state.tabOfTickets && Object.entries(this.state.tabOfTickets).map(([key, value])=> {
          return (this.columnItem("< "+key + " $", value.length, this.getAverage(value.map((ticket)=>this.getBenefice(ticket)))+ " $") )
        })}
        <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }

        button {
          border-radius:5px;
          border-width:0;
          color:white;
          cursor:pointer;
          outline: 1px solid #fff;
        }

        #buttonIntervalContainer {
          position:absolute;
          top:20px;
          right:20px;
        }

        .buttonInterval {
          background-color : rgba(68,162,110);
          width:40px;
          height:30px;
        }

        .buttonInterval:hover {
          background-color : rgba(91,207,143);
        }

      `}</style>
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
