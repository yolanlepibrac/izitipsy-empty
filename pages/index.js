

import fetch from 'isomorphic-unfetch'
import React from "react";
import Link from 'next/link';



class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bankCharges : 2.9,
      rangeOfValues:20
    };
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
    let tips = ticket.tips || 0
    let totalAmount = ticket.total || ticket.amount + tips
    if(ticket.amount !== 0){
      return  (tips - 0.3 - this.state.bankCharges/100 * totalAmount) * 100 / ticket.amount
    }else{
      return 0
    }

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
  }


  render() {
    return (
      <div id="container">
        <img id="logoSimplyk" src={"/images/simplyk-logo.png"} width="400px"></img>
        <h2>Bénéfices par prix du billet</h2>

        <div id="bankChargesContainer">
          <label>Frais bancaires</label>
          <input id="inputBankCharge" type="number" min="0" max="10" step="0.1" value={this.state.bankCharges} onChange={e => this.setBankCharges(e.target.value)}>
          </input>
        </div>

        <div id="buttonintervalleContainer">
          <label>intervalle de prix</label>
          {[5,10,20,50,100].map((value)=>{
            return (
              <button className="buttonintervalle" style={{backgroundColor:this.state.rangeOfValues===value ? "rgba(53,117,65,1)":null}} onClick={() => this.setValue(value)}>{value}
              </button>)
            })
          }
        </div>

        <div id="separationLine"></div>
        <div id="chargesLegend">
          <p>Frais bancaires</p>
          <p style={{fontSize:30, marginLeft:20}}>{this.state.bankCharges+" %"}</p>
        </div>

        {this.columnItem("Montant du billet","Nombre de billets","Bénéfice moyen", true)}
        {this.sortTicketsArray(this.props.ticketsDb.tickets, 20) && Object.entries(this.sortTicketsArray(this.props.ticketsDb.tickets, this.state.rangeOfValues)).map(([key, value])=> {
          return (this.columnItem("< "+key + " $", value.length, this.getAverage(value.map((ticket)=>this.getBenefice(ticket)))+ " %") )
        })}
        <style jsx>{`
        h1,

        h2{
          text-align : center
        }
        a {
          font-family: 'Arial';
        }

        #container{
          display:flex;
          flex-direction:column;
          align-items:center;
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

        #separationLine{
          width:200px;
          height:10px;
          background-color:black;
          align-items:center
        }

        #chargesLegend{
          width:100%;
          display:flex;
          flex-direction:row;
          justify-content:center;
          align-items:center;
        }

        button {
          border-radius:5px;
          border-width:0;
          color:white;
          cursor:pointer;
          outline: 1px solid #fff;
        }

        #buttonintervalleContainer {
          position:absolute;
          top:20px;
          right:20px;
        }

        .buttonintervalle {
          background-color : rgba(68,162,110);
          width:40px;
          height:30px;
        }

        .buttonintervalle:hover {
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
