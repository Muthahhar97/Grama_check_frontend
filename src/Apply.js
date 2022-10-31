import { useEffect, useState } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import Status from "./Status";

const Apply = () => {
  const { state, getIDToken, signIn, signOut } = useAuthContext();

  const [name, setName] = useState("");
  const [nic, setNic] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isClicked,setIsClicked]=useState(false);
  

  const getAccessToken = () => {
    getIDToken().then((idToken) => {

        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Basic REZTVkdDVlB0Y2hoTklGWVZlaHl2YmhfeVJnYTpBQ1NnWWlUdXROQTNDTDNhckQ1NEpma2ZHTjRh"
        );
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append(
          "Cookie",
          "apim=1666928503.436.602.131201|dcb1dc1c03c8f17e5aa485d6222013b8"
        );
    
        var urlencoded = new URLSearchParams();
        urlencoded.append(
          "grant_type",
          "urn:ietf:params:oauth:grant-type:token-exchange"
        );
        urlencoded.append(
          "subject_token",idToken
        );
        urlencoded.append(
          "subject_token_type",
          "urn:ietf:params:oauth:token-type:jwt"
        );
        urlencoded.append(
          "requested_token_type",
          "urn:ietf:params:oauth:token-type:jwt"
        );
    
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow",
        };
    
        fetch("https://sts.choreo.dev/oauth2/token", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            sessionStorage.setItem('choreoToken',result.access_token);
            console.log(sessionStorage.getItem('choreoToken'));
          })
          .catch((error) => console.log("error", error));
    });

    
  }

  useEffect(()=>{
    if(state.isAuthenticated){
        getAccessToken();
    }else{
      localStorage.clear();
    }
  },[state.isAuthenticated]);

  const handleSubmit = (e) => {
    if (state.isAuthenticated) {
      e.preventDefault();
      setIsPending(true);

      const abortCn = new AbortController();

      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer "+sessionStorage.getItem('choreoToken')
      );

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://b2e7a523-272c-4c34-bae9-e095bdade5f9-prod.e1-us-east-azure.choreoapis.dev/lxdf/addressinsertapi/1.0.0/integrateCheck/" +
          nic +
          "/" +
          address +
          "/" +
          phone,
        requestOptions,
        { signal: abortCn.signal }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          localStorage.setItem('success',result.success);
          localStorage.setItem('msg',result.msg);
          console.log(localStorage.getItem('success'));
          console.log(localStorage.getItem('msg'));
          setIsPending(false);
        })
        .catch((err) => {
          console.log("error", err.message);
          setIsPending(false);
        });

      return () => abortCn.abort();
    } else {
      signIn();
    }
  };

  return (
    <div className="apply">
      <h2>Request to obtain Grama-Certificate</h2>
      <form onSubmit={handleSubmit}>
        <label> Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label> NIC</label>
        <input
          type="text"
          required
          value={nic}
          onChange={(e) => setNic(e.target.value)}
        />
        <label> Address</label>
        <input
          type="text"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label> Phone</label>
        <input
          type="text"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {isPending ? (
          <button disabled>Submitting....</button>
        ) : (
          <button onClick={()=>setIsClicked(false)}>Submit</button>
        )}
      </form>
      <br /><br/>

      {isPending ? (
          <button disabled>Checking...</button>
        ) : (
          <button onClick={()=>setIsClicked(true)}>Get Certificate</button>
        )}

      {isClicked && <div>{localStorage.getItem('success')=="true"? <Status name={name} nic={nic} address={address}/>:localStorage.getItem('msg')=="NIC is not Valid"?<p>Entered NIC is Ivalid. Please Check once again</p>:localStorage.getItem('msg')=="Police Validation Failed"?<p>Police Validation Failed. You have Criminal Activities</p>:<p>Address Validation Failed. Please enter a valid address</p>}</div>}

      {/* {isClicked && <div>{localStorage.getItem('success')?<Status/>:<div>{localStorage.getItem('msg')=="NIC is not Valid"?<p>Entered Nic</p>}</div>}</div>} */}

    </div>
  );
};

export default Apply;
