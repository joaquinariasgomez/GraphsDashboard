import StackedBarChart from "./StackedBarChart";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import MultiLineChart from "./MultiLineChart";

export default function GraphFactory({ graphData, desiredGraphOptions }) {

    // const renderGraphOld = () => {
    //     switch (graphData.type) {
    //         case "Expenses in the last 7 days":
    //             return (
    //                 <BarChart
    //                     graphData={graphData}
    //                 />
    //             );
    //         case "Expenses in the last 7 days by category":
    //             return (
    //                 <StackedBarChart
    //                     graphData={graphData}
    //                 />
    //             );
    //         case "Expenses in the last 30 days":
    //             return (
    //                 <BarChart
    //                     graphData={graphData}
    //                 />
    //             );
    //         case "Expenses in the last 30 days by category":
    //             return (
    //                 <StackedBarChart
    //                     graphData={graphData}
    //                 />
    //             );
    //         case "Expenses":
    //             return (
    //                 <BarChart
    //                     graphData={graphData}
    //                 />
    //             );
    //         case "Expenses by category":
    //             return (
    //                 <StackedBarChart
    //                     graphData={graphData}
    //                 />
    //             );
    //         case "Incomes":
    //             return (
    //                 <BarChart
    //                     graphData={graphData}
    //                 />
    //             );
    //         case "Incomes since november by category":
    //             return (
    //                 <StackedBarChart
    //                     graphData={graphData}
    //                 />
    //             );
    //         case "Incomes by category":
    //             return (
    //                 <StackedBarChart
    //                     graphData={graphData}
    //                 />
    //             );
    //         case "Incomes in 2024 by category":
    //             return (
    //                 <StackedBarChart
    //                     graphData={graphData}
    //                 />
    //             );
    //         case "Savings since november":
    //             return (
    //                 <StackedBarChart
    //                     graphData={graphData}
    //                 />
    //             );
    //         case "Savings":
    //             return (
    //                 <StackedBarChart
    //                     graphData={graphData}
    //                 />
    //             );
    //         case "Savings in 2024":
    //             return (
    //                 <StackedBarChart
    //                     graphData={graphData}
    //                 />
    //             );
    //         case "Cumulative savings since november":
    //             return (
    //                 <AreaChart
    //                     graphData={graphData}
    //                 />
    //             );
    //         case "Cumulative savings":
    //             return (
    //                 <AreaChart
    //                     graphData={graphData}
    //                 />
    //             );
    //         case "Cumulative savings in 2024":
    //             return (
    //                 <AreaChart
    //                     graphData={graphData}
    //                 />
    //             );
    //         case "Weight and calories evolution":
    //             return (
    //                 <MultiLineChart
    //                     graphData={graphData}
    //                 />
    //             );
    //         default: 
    //             return (    // TODO: mostrar mensaje de error proveniente de backend
    //                 <></>
    //             )
    //     }
    // }

    const renderGraph = () => {
        if(desiredGraphOptions.plot === "Cumulative savings") {
            return (
                <AreaChart
                    graphData={graphData}
                    desiredGraphOptions={desiredGraphOptions}
                />
            );
        }
        if(desiredGraphOptions.filterCategories.type === "SUM" && (desiredGraphOptions.graphType === "EXPENSES" || desiredGraphOptions.graphType === "INCOMES")) {
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