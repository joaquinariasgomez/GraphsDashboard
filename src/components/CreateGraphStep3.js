import React, {useEffect, useState } from 'react';
import Select from 'react-select';
import { createDesiredGraph } from '../RequestUtils';
import { actionTypes } from '../context/globalReducer';
import { useGlobalStateValue } from '../context/GlobalStateProvider';

export default function CreateGraphStep3({ graphOptions, onPrev, onBegin, onChange }) {

    // Context
    const [{botIdCookie}, dispatch] = useGlobalStateValue();

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
            console.log("Success. Time to update state function")

            closeCreateGraphBox()
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
            <div className='creategraphsstep3__buttons'>
                <button
                    className={graphOptions.time === 'LAST WEEK' ? 'selected' : 'not_selected'}
                    onClick={() => handleSelectedTime('LAST WEEK')}
                >
                    <p>Last week</p>
                </button>
                <button
                    className={graphOptions.time === 'LAST MONTH' ? 'selected' : 'not_selected'}
                    onClick={() => handleSelectedTime('LAST MONTH')}
                >
                    <p>Last month</p>
                </button>
                <button
                    className={graphOptions.time === 'LAST YEAR' ? 'selected' : 'not_selected'}
                    onClick={() => handleSelectedTime('LAST YEAR')}
                >
                    <p>Last year</p>
                </button>
            </div>
        )
    }

    return (
        <div className='creategraphbox__contentandlow'>
            <div className='creategraphsstep__content'>
                <div className='creategraphsstep3__groupby'>
                    <h2>Group by</h2>
                    <p>This is a small description.</p>
                    {renderGroupByButtons()}
                </div>
                <div className='creategraphsstep3__time'>
                    <h2>Time</h2>
                    <p>This is a small description.</p>
                    {renderTimeButtons()}
                </div>
                {
                    graphOptions.graphType === 'SAVINGS' &&
                    <div className='creategraphsstep3__plot'>
                        <h2>Plot</h2>
                        <p>This is a small description.</p>
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
                <button className="creategraphbox__nextbutton" onClick={handleCreateGraph} disabled={graphOptions.graphType === 'SAVINGS' && graphOptions.plot === 'Select plot'}>
                    Create Graph
                </button>
            </div>
        </div>  
    );
}