import React from 'react'
import FilterComponent from './Screens/FilterComponent'

function Home() {
  return (
    <div className='Container' style={{ display:'flex', margin:'30px auto',padding:'10px 30px'}}>
        <div style={{margin:"20px auto"}}>
        <h1 style={{fontWeight:"bold",margin:"10px auto"}}>Doctors List</h1>
            <div style={{margin:"20px auto"}}>
                <FilterComponent />
            </div>
        </div>
    </div>
  )
}

export default Home