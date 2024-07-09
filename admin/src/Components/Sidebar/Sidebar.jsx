import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <div className='Sidebar'>
      <Link className='link-style' to='admin/addProduct'><button className='buttonFunction'>Add Product</button></Link>
      <Link className='link-style' to='admin/userManagement'><button className='buttonFunction'>User Management</button></Link>
      <Link className='link-style' to='admin/questionApproval'><button className='buttonFunction'>Question Approval</button></Link>
    </div>
  )
}
