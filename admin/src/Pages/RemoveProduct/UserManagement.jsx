import React, { useState, useEffect } from 'react'
import './UserManagement.css'
import axios from 'axios'
import tick from '../../Components/Assets/tick.png'
import cross from '../../Components/Assets/cross.png'

export const UserManagement = () => {

  const [allUsers, setAllUsers] = useState()
  const [state, setState] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:4000/api/getAllUsers')
      .then(res => {
        // console.log(res)
        setAllUsers(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  }, [state])

  const handleDelete = (id) => {
    axios.delete('http://localhost:4000/api/delete', {
      params: {
        id
      }
    })
      .then(res => {
        console.log(res)
        setState(!state)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='userManagementContainer'>
      <h1>User Management</h1>
      <div className="managePanel">
        {allUsers &&
          allUsers.map((user, index) => {
            return (
              <div key={index} className='userContainer'>
                <p className="userAvatar">{user.lastname.charAt(0) + user.firstname.charAt(0)}</p>
                <p className='name'>{user.lastname + ' ' + user.firstname}</p>
                <div className="userManagementButton">
                  {/* <img src={tick} alt="" /> */}
                  <img onClick={() => handleDelete(user._id)} src={cross} alt="" />
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
