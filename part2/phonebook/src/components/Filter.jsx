const Filter = ({ filter, handleFilterChange }) => {
    return (
        <div>
            filter shown with <input id="filter" value={filter} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter