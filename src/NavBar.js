import { Link } from 'react-router-dom'
import { useAuthContext } from "@asgardeo/auth-react";


const NavBar = () => {

    const { state, signIn, signOut } = useAuthContext();

    return (  

        <nav className="navbar">
            <h1>Grama-Check</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/apply">Apply</Link>
                <Link to="/status">Status</Link>
                <Link to="">Help</Link>
                
            {state.isAuthenticated? <button className="button" onClick={() => signOut()} style={{ background: "#f55810",color: "#fff",border: 0,  padding: '8px',borderRadius: '8px',cursor: 'pointer', marginLeft:'10px'}} > Logout </button> : <button  className="button" onClick={() => signIn()} style={{ background: "#f55810",color: "#fff",border: 0,  padding: '8px',borderRadius: '8px',cursor:'pointer', marginLeft:'10px'}}>Login</button> }

            </div>
        </nav>
    );
}
 
export default NavBar;