import React, { useState, useEffect, useContext } from "react";
import TicketCard from "../components/TicketCard";
import axios from 'axios';
// import CategoriesContext from "../context";

const Dashboard = () => {

  const [tickets, setTickets] = useState(null)
  // const { categories, setCategories } = useContext(CategoriesContext)

  useEffect(() => {
    const asyncFunc = async () => {
      const response = await axios.get('http://localhost:8000/tasks')

      const dataObject = response.data.data
  
      const arrayOfKeys = Object.keys(dataObject)
      const arrayOfData = Object.keys(dataObject).map(key => dataObject[key])
      const formattedArray = []
    
      arrayOfKeys.forEach((key, index) => {
        const formattedData = {...arrayOfData[index]}
        formattedData['documentId'] = key
        formattedArray.push(formattedData)
      })
      setTickets(formattedArray)
    }
    asyncFunc()
  }, [])

  // useEffect(() => {
  //   setCategories([...new Set(tickets?.map(({category}) => category))])
  // }, [])

  const colors = [
    'rgb(255, 179, 186)',
    'rgb(255, 233, 186)',
    'rgb(255, 255, 186)',
    'rgb(186, 255, 201)',
    'rgb(186, 255, 255)',
  ]

  /* ----- Old Categories ----- */
  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category))
  ]

  // const uniqueCategories = [
  //   ...new Set(tickets?.map(({ category }) => category))
  // ]

  return (
    <div className="dashboard">
      <h1>My Projects</h1>
      <div className="ticket-container">
        {tickets && uniqueCategories?.map((uniqueCategory, categoryIndex) => (
          <div key={categoryIndex}>
            <h3>{uniqueCategory}</h3>
            {tickets.filter(ticket => ticket.category === uniqueCategory)
              .map((filteredTicket, ticketIndex) => (
                <TicketCard 
                  id={ticketIndex}
                  color={colors[categoryIndex]}
                  ticket={filteredTicket}
                />
              ))
            }
          </div>
        ))}
      </div>
    </div>
  )
};

export default Dashboard;
