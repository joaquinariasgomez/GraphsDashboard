const BackendBaseURl = "http://localhost:8080/api";
const BackendAPIVersion = "v1";
const GraphsResource = "graphs";
const DesiredGraphsResource = "desiredgraphs";

const Config = {
    BackendGraphsURL: BackendBaseURl + "/" + BackendAPIVersion + "/" + GraphsResource,
    BackendDesiredGraphsURL: BackendBaseURl + "/" + BackendAPIVersion + "/" + DesiredGraphsResource
}

export default Config;