import StackedBarChart from "./StackedBarChart";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";

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
            case "Ingresos desde noviembre por categoría":
                return (
                    <StackedBarChart
                        graphData={graphData}
                    />
                );
            case "Ahorros acumulado desde noviembre":
                return (
                    <AreaChart
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