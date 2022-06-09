import React, { useState, useEffect, createContext } from "react";
import {Card,Dropdown, Button } from 'semantic-ui-react';


const FilterComponent = () => {
  const [data, setData] = useState();
  const [specialized, setSpecialized] = useState();
  const [fee, setFee] = useState("NaN");
  const [result, setResult] = useState(true);
  const [inform, setInform] = useState();
  const a1 = []
  const b1= []
  const tagOptions = [];
  const options = [];

  useEffect(() => {
    getData();
  }, []);

  if (data){
    for(let i=0;i<data.length;i++){
      a1.push({key:data[i].Specialization,text:data[i].Specialization,value:data[i].Specialization})
      b1.push({key:i+1,text:data[i].Fees,value:data[i].Fees})
    }
    for(let i=0;i<data.length;i++){
      if(a1.indexOf(data[i].Specialization)===-1){
        tagOptions.push({key:data[i].Specialization,text:data[i].Specialization,value:data[i].Specialization})
      }
      if(options.indexOf(data[i].Fees)===-1){
      options.push({key:i+1,text:data[i].Fees,value:data[i].Fees})
      }
    }
    
  }

  function SearchDoc(){
    fetch(`http://127.0.0.1:4000/api/doctors/doctor`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        Specialization:specialized,
        Fees:fee
      }),
    }).then(res=>res.json())
    .then(info=>{
      setResult(false);
      setInform(info)
    })
    .catch((e)=>alert(e))
  }

  function getData() {
    fetch("http://127.0.0.1:4000/api/doctors/")
      .then((response) => response.json())
      .then((json) => {
        setData(json)
      })
      .catch((e) => {
        alert(e);
      });
  }
  return (
    <>
    <Dropdown
      placeholder='Try to search Doctor by their specialization'
      search
      searchInput={{ type: 'String' }}
      selection
      options={tagOptions}
      onChange={(e, { value }) => setSpecialized(value)}
    >
    </Dropdown>
    <Dropdown
      search
      searchInput={{ type: 'number' }}
      selection
      options={options}
      placeholder='Consultation Fee'
      style={{ marginLeft: '10px' }}
      onChange={(e, { value }) => setFee(value)}
    />
    <Button onClick={()=>{SearchDoc()}} basic color='blue' style={{marginLeft:'10px'}}>Search</Button>
    <Button onClick={()=>{setResult(true)}} basic color='teal' style={{marginLeft:'10px'}}>Clear Search</Button>
    {
      data && result==true?
      Object.keys(data).map((ind)=>{
        return (
          <Card.Group itemsPerRow={1} style={{margin:"20px auto"}}>
        <Card key={ind}>
              <Card.Content>
                <Card.Header color="blue">{data[ind].Name}</Card.Header>
                <Card.Meta>{data[ind].Specialization}</Card.Meta>
                <Card.Meta>Experience: {data[ind].Experience} years</Card.Meta>
                <Card.Meta>Consultation Charge: RS {data[ind].Fees}</Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="green">
                    Consult Now
                  </Button>
                </div>
              </Card.Content>
            </Card>
      </Card.Group>
        )
      }):inform?
      inform.length?Object.keys(inform).map((ind)=>{
        return (
          <Card.Group itemsPerRow={1} style={{margin:"20px auto"}}>
        <Card key={ind}>
              <Card.Content>
                <Card.Header color="blue">{inform[ind].Name}</Card.Header>
                <Card.Meta>{inform[ind].Specialization}</Card.Meta>
                <Card.Meta>Experience: {inform[ind].Experience} years</Card.Meta>
                <Card.Meta>Consultation Charge: RS {inform[ind].Fees}</Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="green">
                    Consult Now
                  </Button>
                </div>
              </Card.Content>
            </Card>
      </Card.Group>
        )
      }):<h1>No Result Found</h1>:null
      
    }

    </>
  )
}

export default FilterComponent