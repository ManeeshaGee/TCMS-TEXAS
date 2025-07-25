import React from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import LoanFacilityManagement from './LoanFacility'
import NewSidebar from '../../components/Sidebar/NewSidebar'
import { useEffect } from 'react';


export default function NewTest() {
  useEffect(() => {
          const token = localStorage.getItem("token");
          if (!token) {
              alert("Please login to access this page");
              window.location.href = "/login";
           }
          const user = JSON.parse(localStorage.getItem("user"));
            if(user?.role !== "super_admin") {
               alert("You do not have permission to access this page");
               window.location.href = "/login";
            }
          const verifyToken = async () => {
             try {
                 const res = await fetch('/api/auth/verifyToken', {
                   method: 'POST',
                   headers: {
                      'Authorization': `Bearer ${token}`,
                   },
                });
                   const data = await res.json();
                   if (data.message === "Token expired" || "Invalid token") {
                      alert("Session expired, please login again");
                      window.location.href = "/login";
  
                    }
                } catch (error) {
                   console.log("Message",error,token);
                }
          }
          verifyToken();
       },[]);
  return (
    <>
      <Header/>
                  <NewSidebar/>
                  <div className='p-4 sm:ml-64'>
                      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                           <div className="grid gap-3 mb-4">
                               
                                <div className="flex  rounded-sm bg-gray-50 dark:bg-gray-800">
                                   <LoanFacilityManagement/>
                                </div>
      
                              </div>
                          </div>
                      </div>
    </>
    
  )
}
