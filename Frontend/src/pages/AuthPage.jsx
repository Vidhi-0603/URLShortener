import React from 'react'
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from '../components/RegisterForm';

const AuthPage = () => {
    const [isRegistered, setisRegistered] = React.useState(true);
  return (
    <>
      {isRegistered ? (
        <LoginForm state={setisRegistered} />
      ) : (
        <RegisterForm state={setisRegistered} />
      )}
    </>
  );
}

export default AuthPage