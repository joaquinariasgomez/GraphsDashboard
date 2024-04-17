

export default function LoginBox({  }) {

    const authorization_url = "https://api.notion.com/v1/oauth/authorize?client_id=7b3518ee-dfde-4748-b007-7cd1c3405e0d&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FGraphsDashboard";

    return (
        <a className="login__button" href={authorization_url}>
            <p>Login with Notion</p>
            <img src={process.env.PUBLIC_URL+'/notion_logo.png'} alt=''></img>
        </a>
    )
}