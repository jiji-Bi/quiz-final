import {useEffect, useReducer, useState} from "react";
import axios from "axios";
import Chart from "./Chart";
import './Dashboard.css';
const Dashboard = () => {
  const url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/metadata';
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [filterCountry, setFilterCountry] = useState({});

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

 

{
  return <div className="App">
    <h1 className="title">Dashboard Admin</h1>
  
    <h2 className="title"></h2>
    <div className="charts">
      <Chart height={'500px'} width={'500px'} chartId={'66a6aba1-6d1c-4508-a983-a485443a5294'}/>
      <Chart height={'500px'} width={'500px'} chartId={'93e03377-07b7-439e-91ec-63035dc8ad31'}/>
      <Chart height={'500px'} width={'500px'} chartId={'2da301eb-66e7-4725-9038-f2f5ea148faf'}/>
      <Chart height={'500px'} width={'500px'} chartId={'f4fb542c-4973-40e5-8834-f2082943930d'}/>
      <Chart height={'500px'} width={'500px'} chartId={'322007d6-f673-41ca-b361-8ea133b4ebca'}/>
      <Chart height={'500px'} width={'500px'} chartId={'3f1cd9af-d3a0-4a26-95f2-73d1eaeb8d48'}/>
      <Chart height={'500px'} width={'500px'} chartId={'a9fa4118-a2f3-4322-9b49-f864d091ecdd'}/>

    </div>
  </div>


}
}
export default Dashboard;