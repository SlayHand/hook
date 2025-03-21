import './Login.css';

import { useEffect, useReducer, useState } from 'react';
import Card from '../UI/Card.jsx';
import Button from '../UI/Button.jsx';

const emailReducer = (state, action) => {
    if(action.type === 'USER_INPUT'){
        return {
            value: action.val,
            isValid: action.val.includes('@')
        }
    }
    if(action.type === 'INPUT_BLUR'){
        return {
            value: state.value,
            isValid: state.value.includes('@')
        }
    }
    return {
        value: '',
        isValid: false
    }
}

const passwordReducer = (state, action) => {
    if(action.type === 'USER_INPUT'){
        return {
            value: action.val,
            isValid: action.val.trim().length > 6
        }
    }
    if(action.type === 'INPUT_BLUR'){
        return {
            value: state.value,
            isValid: state.value.trim().length > 6
        }
    }
    return {
        value: '',
        isValid: false
    }
}

const Login = (props) => {
    const [enteredEmail, setEnteredEmail] =useState('')
    const [enteredPassword, setEnteredPassword] =useState('')
    const [emailIsValid, setEmailIsValid] =useState()
    const [passwordIsValid, setPasswordIsValid] =useState()
    const [formIsValid, setFormIsValid] = useState(false)
    const [emailState, dispatchEmail] = useReducer (
        emailReducer,
        {
            value: '',
            isValid: null
        }
    )

    const [passwordState, dispatchPassword] = useReducer(
        passwordReducer,
        {
            value: '',
            isValid: null
        }
    )
    useEffect(() => {
        const timeout = setTimeout (() => {
            console.log('check form is valid')
            setFormIsValid(emailState.isValid && passwordState.isValid)
            console.log('checked')
        }, 500)
        return () => {
            clearTimeout(timeout)
        }
    }, [emailState.isValid, passwordState.isValid])

    const emailChangeHandler = (event) => {
        dispatchEmail({
            type: 'USER_INPUT',
            val: event.target.value
        })
        setFormIsValid(emailState.isValid && passwordState.isValid)
    }

    const passwordChangeHandler = (event) => {
        dispatchPassword({
            type: 'USER_INPUT',
            val: event.target.value
        })
        setFormIsValid(emailState.isValid && passwordState.isValid)
    }

    const emailValidateHandler = () => {
        dispatchEmail({
            type: 'INPUT_BLUR',
        })
    }

    const passwordValidateHandler = () => {
        dispatchPassword({
            type: 'INPUT_BLUR',
        })
    }

    const submitHandler= (event) => {
        event.preventDefault()
        props.onLogin(emailState.value, passwordState.value)
    }

    return (
        <Card className="login">
            <form onSubmit={submitHandler}>
                <div className={`control ${emailState.IsValid === false ? 'invalid' : ''}`}>
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email" 
                    id="email"
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={emailValidateHandler}
                    ></input>
                </div>
                <div className={`control ${passwordState.IsValid === false ? 'invalid' : ''}`}>
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    id="password"
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={passwordValidateHandler}
                    ></input>
                </div>
                <div className='actions'>
                    <Button 
                    type="submit"
                    disabled={!formIsValid}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    )
}

export default Login