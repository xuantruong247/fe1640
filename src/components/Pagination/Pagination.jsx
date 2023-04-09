import React from 'react'
// import PropTypes from 'prop-types'
import { FcPrevious, FcNext } from "react-icons/fc";

const Pagination = props => {
  return (
    <div className='flex my-[14px]'>
      <button className='h-[40px] w-[60px] bg-white flex items-center justify-center rounded-lg mx-[6px]'>
        <FcPrevious/>
      </button>
      <button className='h-[40px] w-[60px] bg-white flex items-center justify-center rounded-lg mx-[6px]'>
        <FcNext/>
      </button>
    </div>
  )
}

Pagination.propTypes = {}

export default Pagination