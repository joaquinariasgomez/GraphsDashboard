const BackendBaseURl = "http://localhost:8080/api";
const OnDemandBackendBaseURl = "http://localhost:8081/api";
const NotionGraphsBackendBaseURl = "http://localhost:8082/api";
const BackendAPIVersion = "v1";
const OnDemandBackendAPIVersion = "v1";
const NotionGraphsBackendAPIVersion = "v1";
const GraphsResource = "graphs";
const DesiredGraphsResource = "desiredgraphs";

const Config = {
    BackendGraphsURL: BackendBaseURl + "/" + BackendAPIVersion + "/" + GraphsResource,
    BackendDesiredGraphsURL: BackendBaseURl + "/" + BackendAPIVersion + "/" + DesiredGraphsResource,
    OnDemandGraphsURL: OnDemandBackendBaseURl + "/" + OnDemandBackendAPIVersion,
    NotionGraphsURL: NotionGraphsBackendBaseURl + "/" + NotionGraphsBackendAPIVersion
}

export default Config;