const Config = {
    BackendGraphsURL: process.env.REACT_APP_BACKEND_GRAPHS_URL,
    BackendStripeURL: process.env.REACT_APP_BACKEND_STRIPE_URL,
    BackendBillingURL: process.env.REACT_APP_BACKEND_BILLING_URL,
    BackendSessionURL: process.env.REACT_APP_BACKEND_SESSION_URL,
    BackendDesiredGraphsURL: process.env.REACT_APP_BACKEND_DESIREDGRAPHS_URL,
    OnDemandGraphsURL: process.env.REACT_APP_BACKEND_ONDEMANDGRAPHS_URL,
    NotionGraphsAuthURL: process.env.REACT_APP_BACKEND_NOTIONGRAPHSAUTH_URL,
    NotionGraphsFeedbackURL: process.env.REACT_APP_BACKEND_NOTIONGRAPHSFEEDBACK_URL,
    StripePublicKey: process.env.REACT_APP_STRIPE_PUBLIC_KEY
}

export default Config;