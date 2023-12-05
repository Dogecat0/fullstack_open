import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, []);

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const personExists = persons.find(person => person.name === newName)

    if (personExists) {
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        const personObject = {
          name: newName,
          number: newNumber,
          id: personExists.id,
        }
        
        personService
          .update(personExists.id, personObject)
          .then(returnedPerson => {
            setSuccessMessage(`Updated ${personObject.name} successfully!`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
            setPersons(persons.map(person => person.id !== personExists.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            const message = error.response?.data?.error || `Error updating ${personObject.name}`;
            setErrorMessage(message)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } 
    else 
    {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      
      personService
        .create(personObject)
        .then(returnedPerson => {
          setSuccessMessage(`Added ${personObject.name} successfully!`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          const message = error.response?.data?.error || `Error adding ${personObject.name}`;
          setErrorMessage(message)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    const result = window.confirm(`Delete ${person.name}?`)
    if (result) {
      personService
        .del(id)
        .then(() => {
          setSuccessMessage(`Deleted ${person.name} successfully!`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          const message = error.response?.data?.error || `Error deleting ${person.name}`;
          setErrorMessage(message)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
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
      
  return (
    <div>
      <div>
        <Notification message={successMessage} type="success"/>
        <Notification message={errorMessage} type="error"/>
      </div>
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
      <Person personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App