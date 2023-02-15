import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = () => {

    const [loginActive, setLoginActive] = useState(true);
    const navigate = useNavigate();

    const [state, setState] = useState({
        fullName: "",
        email: "",
        password: ""
    })

    const handleOnChange = (e)=>{
        setState({...state, [e.target.name]: e.target.value});
    }
    const handleLogin = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: state.email,
                password: state.password
            }),
        })
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token', json.token);
            localStorage.setItem('email', json.email);
            console.log(localStorage.getItem('email'));
            navigate('/');
        }
        else{
            alert(json.error);
        }
    }
    const handleRegister = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullName: state.fullName,
                email: state.email,
                password: state.password
            }),
        })
        const json = await response.json();
        if(json.success){
            alert('Account created please login...');
        }
        else{
            alert(json.error);
        }
    }

    return <>

        <div className="bg-gray-200 h-screen flex justify-center items-center flex-col">
            <h1><span className="cursor-pointer m-8" onClick={()=>{setLoginActive(true)}}>Login</span> <span className="cursor-pointer m-8" onClick={()=>{setLoginActive(false)}}>Register</span></h1> 
            <div className={`bg-white p-12 ${loginActive?'hidden':'block'}`}>
                <form method='POST' onSubmit={handleRegister}>
                    <div>
                        <input name="fullName" className="m-4 w-80 p-4 border-2 border-gray-200" type="text" placeholder="Full Name" onChange={handleOnChange}/>
                    </div>
                    <div>
                        <input name="email" className="m-4 w-80 p-4 border-2 border-gray-200" type="text" placeholder="Email Address" onChange={handleOnChange}/>
                    </div>
                    <div>
                        <input name="password" className="m-4 w-80 p-4 border-2 border-gray-200" type="password" placeholder="Password" onChange={handleOnChange}/>
                    </div>
                    <div>
                        <button type="submit" className="m-4 w-80 p-4 border-2 bg-yellow-500 border-none font-bold hover:bg-black hover:text-white">Register</button>
                    </div>
                </form>
            </div>
            <div className={`bg-white p-12 ${loginActive?'block':'hidden'}`}>
                <form method='POST' onSubmit={handleLogin}>

                    <div>
                        <input name="email" className="m-4 w-80 p-4 border-2 border-gray-200" type="text" placeholder="Email Address" onChange={handleOnChange}/>
                    </div>
                    <div>
                        <input name="password" className="m-4 w-80 p-4 border-2 border-gray-200" type="password" placeholder="Password" onChange={handleOnChange}/>
                    </div>
                    <div>
                        <button type="submit" className="m-4 w-80 p-4 border-2 bg-yellow-500 border-none font-bold hover:bg-black hover:text-white">Login</button>
                    </div>
                </form>
            </div>

        </div>





    </>
}

export default Signin;