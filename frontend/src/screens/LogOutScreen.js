import React, { useEffect }  from 'react';
import Cookie from 'js-cookie';
function LogOutScreen (props) {
    
   
    useEffect(()=>{
        Cookie.remove("userInfo");
        alert("Logged out")
        props.history.push("/");
        
        return ()=>{
    
        }
        
      },[])
    return <div className="banners"><h5>Succesfully logged out</h5></div>
}

export default LogOutScreen;