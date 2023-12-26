import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import './Login.css';
// import './LoginPage.css';
// import Logo from "../../assets/Logo.JPG";
// import Background from "../../assets/background1.avif"
import { Navigate, useNavigate } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = () => {
   if(email==="admin"&& password==="admin"){
    navigate("/BRD");
   }
  };

  return (
    <>
    <nav  className="horizontal-navbar">
        {/* <img  ClassName="img" src = {logo} alt="" /> */}
          
          <h1> Welcome Back!</h1>
          
        </nav>
    <div className="main-container" >
      <div className="login-card">
        <div className="login-card-left">
        <div className="icon">
          </div>
          {/* <h1 >Welcome to Aditya Birla Capital Family</h1> */}
          {/* <p >You are a few steps away. Login to start your journey with us.</p> */}
          
        </div>
        <div className="login-card-right">
          <h2 >Login</h2>
          <div className="form-group1">
            {/* <label>Email:</label> */}
            <input
            className='textBox-border'
              type="text"
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
             {/* <TextField
                        label = "Password"
                        type='password'
                        variant="outlined"
                        sx={{width:210,height:40}}
                        size="xsmall"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        /> */}
          </div>
          <div className="form-group1">
            {/* <label>Password:</label> */}
            <input
            placeholder='Password'
            className='textBox-border'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
          <button className="login button" type="button" onClick={handleLogin}>Login</button>
          </div>
          
          
       
        </div>
      </div>
    </div>
    <footer className="footer">
        <p>@CopyRight.Login</p>
      </footer>
    </>
  );
}

export default Login;









// import React, { useState } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';
// import './Login.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     if (email === 'admin' && password === 'admin') {
//       navigate('/BRD');
//     }
//   };

//   return (
//     <>
//       <nav className="navbar navbar-light bg-light">
//         <span className="navbar-brand">Welcome Back!</span>
//       </nav>
//       <div className="container mt-3">
//         <div className="card">
//           <div className="card-body">
//             <h2 className="card-title">Login</h2>
//             <div className="form-group">
//               <label htmlFor="email" className="sr-only">Email:</label>
//               <input
//                 id="email"
//                 className="form-control mb-2"
//                 type="text"
//                 value={email}
//                 placeholder="Email"
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password" className="sr-only">Password:</label>
//               <input
//                 id="password"
//                 placeholder="Password"
//                 className="form-control mb-2"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <button className="btn btn-primary btn-block" type="button" onClick={handleLogin}>
//                 Login
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <footer className="footer mt-3">
//         <p>@CopyRight.Login</p>
//       </footer>
//     </>
//   );
// }

// export default Login;








