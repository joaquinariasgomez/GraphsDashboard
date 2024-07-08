import React, {useEffect, useState } from 'react';
import Select from 'react-select';
import { createDesiredGraph, getAllDesiredGraphsByUserId, reloadDesiredGraphAndReturnNewGraph } from '../RequestUtils';
import { actionTypes } from '../context/globalReducer';
import { useGlobalStateValue } from '../context/GlobalStateProvider';
import { customStyleForSelectPlacement } from '../Utils';
import { DateRange } from '@mui/icons-material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function CreateGraphStep3({ graphOptions, onPrev, onBegin, onChange }) {

    // Context
    const [{botIdCookie, userGraphs, userDesiredGraphs}, dispatch] = useGlobalStateValue();

    // Date picker
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onDatePickerChange = (dates) => {
        const [start, end] = dates;
        const startFormatted = (start !== null) ? start.toISOString().split('T')[0] : null;
        const endFormatted = (end !== null) ? end.toISOString().split('T')[0] : null;
        setStartDate(start);
        setEndDate(end);
        onChange({ customStartDate: startFormatted, customEndDate: endFormatted })
    };

    const handleSelectedGroupBy = (groupBy) => {
        onChange({ groupBy: groupBy });
    }

    const handleSelectedTime = (time) => {
        onChange({ time: time });
    }

    const handleSelectedPlot = (plot) => {
        onChange({ plot: plot });
    }

    function getSelectOptionFrom(input) {
        return {value: input, label: input};
    }

    const closeCreateGraphBox = () => {
        dispatch({
            type: actionTypes.SET_SHOW_CREATE_GRAPH_BOX,
            value: false
        })
    }

    async function handleCreateGraph() {
        // 1. Check that everything is setup okay

        // 2. Send POST request to backend
        const apiResponse = await createDesiredGraph(
            JSON.stringify(
                {
                    userId: "", // Will be filled up by backend
                    botId: botIdCookie,
                    graphOptions: graphOptions
                }
            )
        )
        if(apiResponse) {
            closeCreateGraphBox()
            dispatch({  // Update current desired graphs with the new addition (aka apiResponse)
                type: actionTypes.SET_USER_DESIRED_GRAPHS,
                value: [...userDesiredGraphs, apiResponse]
            })
            const newGraphResponse = await reloadDesiredGraphAndReturnNewGraph(botIdCookie, apiResponse.id);
            dispatch({
                type: actionTypes.SET_USER_GRAPHS,
                value: [...userGraphs, newGraphResponse]
            })
        }
    }

    function getPlotOptions() {
        if(graphOptions.graphType === 'SAVINGS') {
            return [
                {value: 'Savings', label: 'Savings'},
                {value: 'Cumulative savings', label: 'Cumulative savings'},
            ]
        }
    }

    const renderDatePicker = () => {
        return (
            <div className='customdatepicker'>
                <DatePicker
                selected={startDate}
                onChange={onDatePickerChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                />
            </div>
        );
    }

    const renderGroupByButtons = () => {
        return (
            <div className='creategraphsstep3__buttons'>
                <button
                    className={graphOptions.groupBy === 'DAY' ? 'selected' : 'not_selected'}
                    onClick={() => handleSelectedGroupBy('DAY')}
                >
                    <p>Day</p>
                </button>
                <button
                    className={graphOptions.groupBy === 'WEEK' ? 'selected' : 'not_selected'}
                    onClick={() => handleSelectedGroupBy('WEEK')}
                >
                    <p>Week</p>
                </button>
                <button
                    className={graphOptions.groupBy === 'MONTH' ? 'selected' : 'not_selected'}
                    onClick={() => handleSelectedGroupBy('MONTH')}
                >
                    <p>Month</p>
                </button>
            </div>
        )
    }

    const renderTimeButtons = () => {
        return (
            <>
                <div className='creategraphsstep3__buttons'>
                    <button
                        className={graphOptions.time === 'LAST WEEK' ? 'selected time' : 'not_selected time'}
                        onClick={() => handleSelectedTime('LAST WEEK')}
                    >
                        <p>Last week</p>
                    </button>
                    <button
                        className={graphOptions.time === 'LAST MONTH' ? 'selected time' : 'not_selected time'}
                        onClick={() => handleSelectedTime('LAST MONTH')}
                    >
                        <p>Last month</p>
                    </button>
                    <button
                        className={graphOptions.time === 'LAST YEAR' ? 'selected time' : 'not_selected time'}
                        onClick={() => handleSelectedTime('LAST YEAR')}
                    >
                        <p>Last year</p>
                    </button>
                    <button
                        className={graphOptions.time === 'CUSTOM' ? 'selected time' : 'not_selected time'}
                        onClick={() => handleSelectedTime('CUSTOM')}
                    >
                        <p>Custom date</p>
                    </button>
                </div>
                {graphOptions.time === 'CUSTOM' && renderDatePicker()}
            </>
        )
    }

    return (
        <div className='creategraphbox__contentandlow'>
            <div className='creategraphsstep__content'>
                <div className='creategraphsstep3__groupby'>
                    <h2>Group by</h2>
                    <p>Group your data by day, week or month.</p>
                    {renderGroupByButtons()}
                </div>
                <div className='creategraphsstep3__time'>
                    <h2>Time</h2>
                    <p>Since when you want to see your data.</p>
                    {renderTimeButtons()}
                </div>
                {
                    graphOptions.graphType === 'SAVINGS' &&
                    <div className='creategraphsstep3__plot'>
                        <h2>Plot</h2>
                        <p>Choose the type of plot you want to see.</p>
                        <div className='selectplottype'>
                            <Select
                                className='selectgraphtag'
                                defaultValue={getSelectOptionFrom(graphOptions.plot)}
                                theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 5,
                                    colors: {
                                        ...theme.colors,
                                        primary25: 'lightgray',
                                        primary50: 'gray',
                                        primary: 'black'
                                    }
                                })}
                                options={getPlotOptions()}
                                menuPlacement="auto" // Adjust placement to avoid overflow
                                menuPosition="fixed" // Use fixed positioning to handle overflow better
                                styles={customStyleForSelectPlacement}
                                menuPortalTarget={document.body}
                                onChange={function (selectedCategory) {
                                    handleSelectedPlot(selectedCategory.value)
                                }}
                            />
                        </div>
                    </div>
                }
            </div>
            <div className="creategraphbox__nextbackrow">
                <button className="creategraphbox__backbutton" onClick={
                    () => {
                        if(graphOptions.graphType === 'SAVINGS') {
                            onBegin()
                        } else {
                            onPrev()
                        }
                    }
                }>
                    Back
                </button>
                <button className="creategraphbox__nextbutton" onClick={handleCreateGraph}
                disabled={
                    (graphOptions.graphType === 'SAVINGS' && graphOptions.plot === 'Select plot')
                    || (graphOptions.time === 'CUSTOM' && 
                        (graphOptions.customEndDate === null || graphOptions.customEndDate === ""
                            || graphOptions.customStartDate === null || graphOptions.customStartDate === "")
                    )
                }>
                    Create Graph
                </button>
            </div>
        </div>  
    );
}