const BackendBaseURL = "https://empiremay.ddns.net";
const GraphsFetcherService = "/graphsfetcher/api/v1";
const NotionGraphsService = "/notiongraphs/api/v1";
const OnDemandSenderService = "/ondemandsender/api/v1";
const GraphsResource = "/graphs";
const DesiredGraphsResource = "/desiredgraphs";
const AuthResource = "/auth";

const Config = {
    BackendGraphsURL: BackendBaseURL + GraphsFetcherService + GraphsResource,
    BackendDesiredGraphsURL: BackendBaseURL + GraphsFetcherService + DesiredGraphsResource,
    OnDemandGraphsURL: BackendBaseURL + OnDemandSenderService,
    NotionGraphsAuthURL: BackendBaseURL + NotionGraphsService + AuthResource
}

export default Config;