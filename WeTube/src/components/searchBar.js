import React from "react"

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control relative flex-auto min-w-0 block w-20 sm:w-75 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      placeholder="Search..."
      value={value}
      aria-label="Search"
      aria-describedby="search-button"
      onChange={e => onChange(e.currentTarget.value)}
    />
  )
}

export default SearchBar
