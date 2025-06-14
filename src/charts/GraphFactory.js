import StackedBarChart from "./StackedBarChart";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import MultiLineChart from "./MultiLineChart";
import BurndownChart from "./BurndownChart";

export default function GraphFactory({ graphData, desiredGraphOptions }) {

    const renderGraph = () => {
        if (desiredGraphOptions.plot === "Cumulative savings") {
            return (
                <AreaChart
                    graphData={graphData}
                    desiredGraphOptions={desiredGraphOptions}
                />
            );
        }
        if (desiredGraphOptions.filterCategories.type === "BURNDOWN") {
            return (
                <BurndownChart
                    graphData={graphData}
                    desiredGraphOptions={desiredGraphOptions}
                />
            );
        }
        if (desiredGraphOptions.filterCategories.type === "SUM" && (desiredGraphOptions.graphType === "EXPENSES" || desiredGraphOptions.graphType === "INCOMES")) {
            return (
                <BarChart
                    graphData={graphData}
                    desiredGraphOptions={desiredGraphOptions}
                />
            );
        } else {
            return (
                <StackedBarChart
                    graphData={graphData}
                    desiredGraphOptions={desiredGraphOptions}
                />
            );
        }
        // En casos raros
        // return (
        //     <MultiLineChart
        //         graphData={graphData}
        //         desiredGraphOptions={desiredGraphOptions}
        //     />
        // );
    }

    return renderGraph()
}