const Person = ({ personsToShow }) => {
  return (
    <div>
        {personsToShow.map(person => 
            <div key={person.id}>
            {person.name} {person.number}
            </div>
        )}
    </div>
  )
}

export default Person