const Status = ({name, nic, address}) => {

    // var success=localStorage.getItem('success');
    // var message=localStorage.getItem('msg');
    // console.log(success+"----"+message);

    // if(success){
    //     if(message==="NIC is not Valid"){
    //         return (<p>Entered NIC is Ivalid. Please Check once again</p>)
    //     }else if(message==="Police Validation Failed"){
    //         return (<p>Police Validation Failed. You have Criminal Activities</p>)
    //     }else{
    //         return (<p>Address Validation Failed. Please enter a valid address</p>)
    //     }
    // }else{
    
    // }

    return (  
            
        <div className="status">
        <h1>Status</h1>
        <p>Name: {name}<br></br>
        NIC: {nic}<br></br>
        Address: {address}</p>
        </div>
        
    );
}
 
export default Status;