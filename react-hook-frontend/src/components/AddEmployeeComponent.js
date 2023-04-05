import React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { useState,useEffect} from 'react'
import EmployeeService from '../services/EmployeeService'


const AddEmployeeComponent = () => {

    const [firstName, setFirstName] =useState('')
    const [lastName, setLastName] =useState('')
    const [emailId, setEmailId] =useState('')
    const history = useHistory();
    const {id} = useParams();

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        const employee ={firstName, lastName, emailId}

        if(id){ 
            EmployeeService.updateEmployee(id, employee).then((Response) => {
                history.push('/employees')
            }).catch(error =>{
                console.log(error);
            })

        }else{
        EmployeeService.createEmployee(employee).then((Response) =>{

            console.log(Response.data)
            history.push("/employees");

        }).catch(error => {
            console.log(error)
        }) 
      }

    }

   useEffect(() => {
    
    EmployeeService.getEmployeeById(id).then((Response) =>{
        setFirstName(Response.data.firstName)
        setLastName(Response.data.lastName)
        setEmailId(Response.data.emailId)
    }).catch(error => {
        console.log(error)
    })
   }, [])    
    

    return (
        <div>
            <br/><br/>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset md-3'>
                        {
                                id ?  <h2 className='text-center'> Update Employee</h2>
                                :  <h2 className='text-center'> Add Employee</h2> 
                        }
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>First Name :</label>
                                    <input
                                        type='text'
                                        placeholder='Enter first name'
                                        name='firstName'
                                        className='form-control'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        >
                                    </input>

                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Last Name :</label>
                                    <input
                                        type='text'
                                        placeholder='Enter last name'
                                        name='lastName'
                                        className='form-control'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        >
                                    </input>

                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Email Id :</label>
                                    <input
                                        type='text'
                                        placeholder='Enter email Id'
                                        name='emailId'
                                        className='form-control'
                                        value={emailId}
                                        onChange={(e) => setEmailId(e.target.value)}
                                        >
                                    </input>

                                </div>

                                <button className='btn btn-success' onClick={(e) => saveOrUpdateEmployee(e)}>Submit</button>
                                <Link to ="/employees" className='btn btn-danger'>Cancel</Link>
                            </form>

                        </div>
                    </div>

                </div>
        
        
            </div> 
        </div>
    )
}

export default AddEmployeeComponent
