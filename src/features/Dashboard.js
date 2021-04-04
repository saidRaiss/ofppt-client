import React, {useEffect, useState} from 'react'
import AdminDashboard from './AdminDashboard'
import UserDashboard from './UserDashboard'
const Dashboard = () => {
    const [role, setRole] = useState()
    useEffect(()=>{
        const data = JSON.parse(localStorage.user)
        setRole(data.roles[0])
    }, [])
    return(
        role && role !== "ROLE_VAC" ? <AdminDashboard/> : <UserDashboard/>
    )
}
export default Dashboard