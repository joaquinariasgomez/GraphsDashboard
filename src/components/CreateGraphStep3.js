import React, {useEffect, useState } from 'react';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';

export default function CreateGraphStep3({ graphOptions, onPrev, onCreateGraph, onChange }) {

    // const handleSelectedType = (type) => {
    //     // Update data in parent, to send all together
    //     onChange({ graphType: type, filterCategories: {type: 'SUM', category: 'Select category'} });
    // }

    // const handleSelectedTag = (tag) => {
    //     // Update data in parent, to send all together
    //     onChange({ graphTag: tag });
    // }

    const renderGroupByButtons = () => {
        return (
            <div className='creategraphsstep3__buttons'>
                <button
                    className={graphOptions.graphType === 'EXPENSES' ? 'selected' : 'not_selected'}
                    onClick={() => handleSelectedType('EXPENSES')}
                >
                    <TrendingDownRoundedIcon fontSize='large'/>
                    <p>Expenses</p>
                </button>
                <button
                    className={graphOptions.graphType === 'EXPENSES' ? 'selected' : 'not_selected'}
                    onClick={() => handleSelectedType('EXPENSES')}
                >
                    <TrendingDownRoundedIcon fontSize='large'/>
                    <p>Expenses</p>
                </button>
                <button
                    className={graphOptions.graphType === 'EXPENSES' ? 'selected' : 'not_selected'}
                    onClick={() => handleSelectedType('EXPENSES')}
                >
                    <TrendingDownRoundedIcon fontSize='large'/>
                    <p>Expenses</p>
                </button>
            </div>
        )
    }

    const renderIncomesButton = () => {
        if(graphTypeAccess === "ALL" || graphTypeAccess === "ONLY_INCOMES") {
            return (
                <button
                    className={graphOptions.graphType === 'INCOMES' ? 'selected' : 'not_selected'}
                    onClick={() => handleSelectedType('INCOMES')}
                >
                    <AttachMoneyRoundedIcon fontSize='large'/>
                    <p>Incomes</p>
                </button>
            )
        } else {
            return (
                <button
                    disabled={true} className='not_selected'
                >
                    <AttachMoneyRoundedIcon fontSize='large'/>
                    <p>Incomes</p>
                </button>
            )
        }
    }

    const renderSavingsButton = () => {
        if(graphTypeAccess === "ALL") {
            return (
                <button
                    className={graphOptions.graphType === 'SAVINGS' ? 'selected' : 'not_selected'}
                    onClick={() => handleSelectedType('SAVINGS')}
                >
                    <TrendingUpRoundedIcon fontSize='large'/>
                    <p>Savings</p>
                </button>
            )
        } else {
            return (
                <button
                    disabled={true} className='not_selected'
                >
                    <TrendingUpRoundedIcon fontSize='large'/>
                    <p>Savings</p>
                </button>
            )
        }
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
                    <div className='creategraphsstep1__buttons'>
                        <button
                            className={graphOptions.graphTag === 'DAILY' ? 'tags selected' : 'tags not_selected'}
                            onClick={() => handleSelectedTag('DAILY')}
                        >
                            <p>Daily</p>
                        </button>
                        <button
                            className={graphOptions.graphTag === 'WEEKLY' ? 'tags selected' : 'tags not_selected'}
                            onClick={() => handleSelectedTag('WEEKLY')}
                        >
                            <p>Weekly</p>
                        </button>
                        <button
                            className={graphOptions.graphTag === 'MONTHLY' ? 'tags selected' : 'tags not_selected'}
                            onClick={() => handleSelectedTag('MONTHLY')}
                        >
                            <p>Monthly</p>
                        </button>
                    </div>
                </div>
            </div>
            <div className="creategraphbox__nextbackrow">
                <button className="creategraphbox__backbutton" onClick={onPrev}>
                    Back
                </button>
                <button className="creategraphbox__nextbutton" onClick={onCreateGraph}>
                    Create Graph
                </button>
            </div>
        </div>  
    );
}