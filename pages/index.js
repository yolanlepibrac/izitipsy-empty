

import fetch from 'isomorphic-unfetch'
import React from "react";
import Link from 'next/link';

//import logo from './simplyk-logo.png';

/*
import getConfig from 'next/config'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

*/

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
    let tabOfTickets = this.sortTicketsArray(this.props.ticketsDb.tickets, 20)
    this.setState({tabOfTickets})
  }

  sortTicketsArray = (tickets, rangeOfValues) => {
    let ticketsSortedByAmount = {}
    let greatestAmount = Math.max(...tickets.map((tickets)=>tickets.amount))
    let amount = greatestAmount + rangeOfValues - greatestAmount%rangeOfValues
    while (amount>0) {
      for (var i = 0; i < tickets.length; i++) {
        if(tickets[i].amount>=amount-rangeOfValues && tickets[i].amount<amount){
          if(!ticketsSortedByAmount[amount]){
            ticketsSortedByAmount[amount] = []
          }
          ticketsSortedByAmount[amount].push(tickets[i])
        }
      }
      amount = amount-rangeOfValues
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
    let tabOfTickets = this.sortTicketsArray(this.props.ticketsDb.tickets, this.state.rangeOfValues)
    this.setState({tabOfTickets})
  }

  columnItem = (first, second, third, isLegend) => {

      return (
        <div id={isLegend?"tableLegend":"tableItem"} className="ligneItem">
          <div className="cell"><p>{first}</p></div>
          <div className="cell"><p>{second}</p></div>
          <div className="cell"><p>{third}</p></div>
          <style jsx>{`
          .ligneItem{
            display:flex;
            flex-direction:row;
            justify-content:space-around;
            align-items:center;
            width:600px;
          }
          #tableLegend{
            background-color:rgba(53,117,65,1);
            border-top-right-radius:10px;
            border-top-left-radius:10px;
            color:white;
            font-size : 18
          }
          #tableItem{
            background-color:rgba(245,245,245,1);
            font-size : 15
          }
          .cell{
            display:flex;
            flexDirection:row;
            flex:1;
            textAlign:center;
            justify-content:center;
          }
        `}</style>
        </div>
      )

  }

  setValue = (value) => {
    this.setState({rangeOfValues : value})
    let tabOfTickets = this.sortTicketsArray(this.props.ticketsDb.tickets, value)
    this.setState({tabOfTickets})
  }


  render() {
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems: 'center' }}>
        <img id="logoSimplyk" src={"/images/simplyk-logo.png"} width="400px"></img>
        <h2  style={{textAlign:"center"}}>Bénéfices par prix du billet</h2>

        <div id="bankChargesContainer">
          <label>Frais banquaires</label>
          <input id="inputBankCharge" type="number" min="0" max="10" step="0.1" value={this.state.bankCharges} onChange={e => this.setBankCharges(e.target.value)}>
          </input>
        </div>

        <div id="buttonIntervalContainer">
          <label>Interval de prix</label>
          {[5,10,20,50,100].map((value)=>{
            return (
              <button className="buttonInterval" style={{backgroundColor:this.state.rangeOfValues===value ? "rgba(53,117,65,1)":null}} onClick={() => this.setValue(value)}>{value}
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

        label{
          font-weight:bold;
          margin-right:20px;
        }

        #logoSimplyk{
          margin-top:50px;
        }

        #tableLegend{
          background-color:rgba(53,117,65,1);
        }

        #bankChargesContainer{
          position:absolute;
          display:flex;
          top:60px;
          right:20px;
        }

        #inputBankCharge {
          display:flex;
          flex-direction:row;
          justify-content:flex-end;
          align-items:center;
          width:185px;
          height: 20px;
          font-size: 16px;
          padding-left:10px;
          border-radius:5px;
          color:rgba(53,117,65,1);
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
