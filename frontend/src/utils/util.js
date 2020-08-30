const getcookie =  (name) => {
    var returningData;
    var cookieArr = decodeURIComponent(document.cookie.split(","));
   
    cookieArr.split(",").forEach(e=>{
        var entity = e.split(":");
        
        if( name=== (entity[0].trim().replace(/['"]+/g,''))) {
            
            returningData =  entity[1];
         }
        
     })
     
    
    return returningData;
}

const clean = (str)=> {
    str.replace(/['"]+/g,'');
    return str;
}

export  {getcookie,clean};