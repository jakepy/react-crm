const PORT = 8000;
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const url = 'https://be979c7f-6a43-4d81-8ecb-3cd162cfef72-us-east1.apps.astra.datastax.com/api/rest/v2/namespaces/reactcrmkeyspace/collections/tasks'
const token = 'AstraCS:qNkpkZQDuYNsSvPytEgYCWMg:69f98a5709e3c78906e8396c05dc36cec3cd60f5401e4a30853af98bcd900c63'

app.get('/tasks/', async (req, res) => {
  const options = {
    method: 'GET',
    headers: {
      Accepts: 'application/json',
      'X-Cassandra-Token': token
    }
  }
  try {
    const response = await axios(`${url}?page-size=20`, options)
    res.status(200).json(response.data)
  } catch(e) {
    console.log(e)
    res.status(500).json({
      message: e
    })
  }
})

app.get('/tasks/:documentId', async (req, res) => {
  const id = req.params.documentId

  const options = {
    method: 'GET',
    headers: {
      Accepts: 'application/json',
      'X-Cassandra-Token': token
    }
  }

  try {
    const response = await axios(`${url}/${id}`, options)
    res.status(200).json(response.data)
  } catch(e) {
    console.log(e)
    res.status(500).json({message: e})
  }
})

app.post('/tasks', async (req, res) => {
  const formData = req.body.formData

  const options = {
    method: 'POST',
    headers: {
      Accepts: 'application/json',
      'X-Cassandra-Token': token,
      'Content-Type': 'application/json'
    },
    data: formData
  }

  try {
    const response = await axios(url, options)
    res.status(200).json(response.data)
  } catch(e) {
    console.log(e)
    res.status(500).json({ message: e })
  }
})

app.delete('/tasks/:documentId', async (req, res) => {
  const id = req.params.documentId

  const options = {
    method: 'DELETE',
    headers: {
      Acccepts: 'application/json',
      'X-Cassandra-Token': token
    }
  }

  try {
    const response = await axios(`${url}/${id}`, options)
    res.status(200).json(response.data)
  } catch(e) {
    console.log(e)
    res.status(500).json({message: e})
  }
})

app.put('/tasks/:documentId', async (req, res) => {
  const id = req.params.documentId
  const data = req.body.data

  const options = {
    method: 'PUT',
    headers: {
      Accepts: 'application/json',
      'X-Cassandra-Token': token
    },
    data
  }

  try {
    const response = await axios(`${url}/${id}`, options)
    res.status(200).json(response.data)
  } catch(e) {
    console.log(e)
    res.status(500).json({message: e})
  }
})

app.listen(PORT, () => console.log('server running on ' + PORT))