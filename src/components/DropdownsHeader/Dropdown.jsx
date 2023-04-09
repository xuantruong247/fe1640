// import { Fragment } from 'react'
import { FiMenu } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";


export default function Dropdown() {
  // const style = { color: "2F58CD", fontSize: "20px" }
  return (

    <div className='flex justify-center items-center h-[64px]'>
            <FiMenu/>
            <motion.button
              className="w-10 items-center dropdown-toggle float-left	"
              data-toggle="dropdown"
              whileTap={{ scale: 1.2 }}
              alt="Menu"
            />
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <NavLink className="pl-1  dropdown-item" to="/idea">Idea</NavLink>
                    <NavLink className="pl-1  dropdown-item" to="/submission">Submission</NavLink>
                  </div>
          </div>
  )
}
