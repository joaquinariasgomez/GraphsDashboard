import StackedBarChart from "./StackedBarChart";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import MultiLineChart from "./MultiLineChart";

export default function GraphFactory({ graphData }) {

    const renderGraph = () => {
        switch (graphData.type) {
            case "Gastos en los últimos 7 días":
                return (
                    <BarChart
                        graphData={graphData}
                    />
                );
            case "Gastos en los últimos 7 días por categoría":
                return (
                    <StackedBarChart
                        graphData={graphData}
                    />
                );
            case "Gastos en los últimos 30 días":
                return (
                    <BarChart
                        graphData={graphData}
                    />
                );
            case "Gastos en los últimos 30 días por categoría":
                return (
                    <StackedBarChart
                        graphData={graphData}
                    />
                );
            case "Ingresos desde noviembre por categoría":
                return (
                    <StackedBarChart
                        graphData={graphData}
                    />
                );
            case "Ingresos por categoría":
                return (
                    <StackedBarChart
                        graphData={graphData}
                    />
                );
            case "Ingresos en 2024 por categoría":
                return (
                    <StackedBarChart
                        graphData={graphData}
                    />
                );
            case "Ahorros desde noviembre":
                return (
                    <StackedBarChart
                        graphData={graphData}
                    />
                );
            case "Ahorros":
                return (
                    <StackedBarChart
                        graphData={graphData}
                    />
                );
            case "Ahorros en 2024":
                return (
                    <StackedBarChart
                        graphData={graphData}
                    />
                );
            case "Ahorros desde noviembre acumulado":
                return (
                    <AreaChart
                        graphData={graphData}
                    />
                );
            case "Ahorros acumulado":
                return (
                    <AreaChart
                        graphData={graphData}
                    />
                );
            case "Ahorros en 2024 acumulado":
                return (
                    <AreaChart
                        graphData={graphData}
                    />
                );
            case "Evolución de peso":
                return (
                    <MultiLineChart
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