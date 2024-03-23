export const userId = "joaquin";

export function getGraphDataByType(desiredType, response) {
    for(const graph of response) {
        if(graph.type === desiredType) {
            return graph;
        }
    }
}