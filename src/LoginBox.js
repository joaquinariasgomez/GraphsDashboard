

export default function LoginBox({  }) {

    const authorization_url = process.env.REACT_APP_NOTION_AUTH_URL;

    return (
        <a className="login__button" href={authorization_url}>
            <p>Login with Notion</p>
            <img src={process.env.PUBLIC_URL+'/notion_logo.png'} alt=''></img>
        </a>
    )
}