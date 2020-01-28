import React from 'react';

import RightImg from './RightImg';
import FormLogin from './FormLogin';

const messageText:string = "Connectez vous afin de lancer une conversation ";

const Login = (props:any):JSX.Element => {
    return (
        <RightImg messageText={messageText}>
            <FormLogin />
        </RightImg>
    )
}

export default Login;