
import './login.css'
import {FaUser,FaLock} from 'react-icons/fa'
function Login(){
    return (
        <>
        <div className='wrapper'>
            <form action=''>
                <h1>Login</h1>
                <div className='input-box'>
                    <input type='text' placeholder='username' required/>
                    <FaUser className='icon'/>
                </div>
                <div className='input-box'>
                    <input type='password' placeholder='Password' required/>
                    <FaLock className='icon'/>
                </div>
                <button type='submit' >

                </button>
            </form>
        </div>
        </>
    )
}
export default Login