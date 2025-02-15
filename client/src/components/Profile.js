import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { URL } from './config';

function Profile() {

    const navigate = useNavigate();

    let [userData, setUserData] = useState(null)

   
    
   
    useEffect(() => {
        const callProfilePage = async () => {
            try {
    
                const response = await fetch(URL+'/profile', {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "applications/json"
    
                    },
                    credentials: "include"
                })
    
                const data = await response.json();
                console.log(data);
                localStorage.setItem("user",JSON.stringify(data))
                setUserData(data);
    
                if (response.status !== 200) {
                    const err = new Error("Didn't get response");
                    throw err;
                }
            } catch (error) {
                console.log(error);
                navigate('/login')
            }
        }
        callProfilePage();
    }, [navigate])
    return (
        <>
            <section>
                <form method="GET" action='/profile'>
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card mb-4">
                                    <div className="card-body text-center">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" />
                                        <h5 className="my-3">{userData && userData.firstName} {userData && userData.lastName}</h5>
                                        <p className="text-muted mb-1">Full Stack Developer</p>
                                        {/* <p className="text-muted mb-4">Bay Area, San Francisco, CA</p> */}
                                        <div className="d-flex justify-content-center mb-2">
                                            <button type="button" className="btn btn-primary">Follow</button>
                                            <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Full Name</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{userData && userData.firstName} {userData && userData.lastName}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Email</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{userData && userData.email}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Phone</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{userData && userData.phone}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Address</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">Bay Area, San Francisco, CA</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card mb-4 mb-md-0">
                                            <div className="card-body">
                                               
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card mb-4 mb-md-0">
                                            <div className="card-body">
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Profile