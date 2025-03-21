import './Navigation.css'
import Button from '../UI/Button'

import AuthContext from '../../store/auth-contect'

const Navigation = (props) => {
    return (
        <AuthContext.Consumer>
        {(context) => {
        return(
        <nav className='nav'>
            <ul>
                <li>
                    <a href="/users">Users</a>
                </li>
                <li>
                    <a href="/admin">Admin</a>
                </li>
                {props.loggedIn && (
                    <li>
                        <Button onClick={props.onLogout}>Logout
                        </Button>
                    </li>
                )}
            </ul>
        </nav>
        )
        }}
        </AuthContext.Consumer>
    )
}

export default Navigation