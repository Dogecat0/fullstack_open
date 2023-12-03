import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const personExists = persons.find(person => person.name === newName)

    if (personExists) {
      alert(`${newName} is already added to phonebook`)
    } 
    else 
    {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://127.0.0.1:3001/persons')
      .then(response => {console.log('promise fulfilled')
      setPersons(response.data)})
  }
  , [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new person</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange}
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Person personsToShow={personsToShow} />
    </div>
  )
}

export default App