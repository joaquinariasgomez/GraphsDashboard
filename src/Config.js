const BackendBaseURl = "http://localhost:8080/api";
const OnDemandBackendBaseURl = "http://localhost:8081/api";
const BackendAPIVersion = "v1";
const OnDemandBackendAPIVersion = "v1";
const GraphsResource = "graphs";
const DesiredGraphsResource = "desiredgraphs";

const Config = {
    BackendGraphsURL: BackendBaseURl + "/" + BackendAPIVersion + "/" + GraphsResource,
    BackendDesiredGraphsURL: BackendBaseURl + "/" + BackendAPIVersion + "/" + DesiredGraphsResource,
    OnDemandGraphsURL: OnDemandBackendBaseURl + "/" + OnDemandBackendAPIVersion
}

export default Config;