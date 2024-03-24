import StackedBarChart from "./StackedBarChart";
import BarChart from "./BarChart";

export default function GraphFactory({ graphData }) {

    const renderGraph = () => {
        switch (graphData.type) {
            case "Gastos en los últimos 7 días por categoría":
                return (
                    <StackedBarChart
                        graphData={graphData}
                    />
                );
            case "Gastos en los últimos 7 días":
                return (
                    <BarChart
                        graphData={graphData}
                    />
                );
            default: 
                return (    // TODO: mostrar mensaje de error proveniente de backend
                    <></>
                )
        }
    }

    return (
        <div>
            {renderGraph()}
        </div>
    )
}