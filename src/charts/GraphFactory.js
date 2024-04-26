import StackedBarChart from "./StackedBarChart";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import MultiLineChart from "./MultiLineChart";

export default function GraphFactory({ graphData }) {

    const renderGraph = () => {
        switch (graphData.type) {
            case "Expenses in the last 7 days":
                return (
                    <BarChart
                        graphData={graphData}
                    />
                );
            case "Expenses in the last 7 days by category":
                return (
                    <StackedBarChart
                        graphData={graphData}
                    />
                );
            case "Expenses in the last 30 days":
                return (
                    <BarChart
                        graphData={graphData}
                    />
                );
            case "Expenses in the last 30 days by category":
                return (
                    <StackedBarChart
                        graphData={graphData}
                    />
                );
            case "Incomes since november by category":
                return (
                    <StackedBarChart
                        graphData={graphData}
                    />
                );
            case "Incomes by category":
                return (
                    <StackedBarChart
                        graphData={graphData}
                    />
                );
            case "Incomes in 2024 by category":
                return (
                    <StackedBarChart
                        graphData={graphData}
                    />
                );
            case "Savings since november":
                return (
                    <StackedBarChart
                        graphData={graphData}
                    />
                );
            case "Savings":
                return (
                    <StackedBarChart
                        graphData={graphData}
                    />
                );
            case "Savings in 2024":
                return (
                    <StackedBarChart
                        graphData={graphData}
                    />
                );
            case "Cumulative savings since november":
                return (
                    <AreaChart
                        graphData={graphData}
                    />
                );
            case "Cumulative savings":
                return (
                    <AreaChart
                        graphData={graphData}
                    />
                );
            case "Cumulative savings in 2024":
                return (
                    <AreaChart
                        graphData={graphData}
                    />
                );
            case "Weight and calories evolution":
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