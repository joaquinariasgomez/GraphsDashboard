import React, {useState } from 'react';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import SyncLoader from "react-spinners/SyncLoader";

export default function CreateGraphStep1({ onNext, onChange, dataLoading, graphTypeAccess }) {

    // State to manage form data
    const [graphOptions, setGraphOptions] = useState({
        graphType: 'EXPENSES',
        graphTag: 'DAILY'
    });

    // useEffect(() => {
    //     console.log("graphOptions data: ", graphOptions);
    // }, [graphOptions]);

    const handleSelectedType = (type) => {
        setGraphOptions({ ...graphOptions, graphType: type});
        // Update data in parent, to send all together
        onChange({ graphType: type });
    }

    const handleSelectedTag = (tag) => {
        setGraphOptions({ ...graphOptions, graphTag: tag});
        // Update data in parent, to send all together
        onChange({ graphTag: tag });
    }

    const renderGraphTypeButtons = () => {
        if(dataLoading) {
            return renderGraphTypeButtonsLoading()
        } else {
            return renderGraphTypeButtonsFinishedLoading()
        }
    }

    const renderGraphTypeButtonsLoading = () => {
        return (
            <div className='creategraphsstep1__buttons'>
                <button
                    disabled={true} className='not_selected'
                >
                    <TrendingDownRoundedIcon fontSize='large'/>
                    <p>Expenses</p>
                    <SyncLoader size={10}/>
                </button>
                <button
                    disabled={true} className='not_selected'
                >
                    <AttachMoneyRoundedIcon fontSize='large'/>
                    <p>Incomes</p>
                    <SyncLoader size={10}/>
                </button>
                <button
                    disabled={true} className='not_selected'
                >
                    <TrendingUpRoundedIcon fontSize='large'/>
                    <p>Savings</p>
                    <SyncLoader size={10}/>
                </button>
            </div>
        )
    }

    const renderGraphTypeButtonsFinishedLoading = () => {
        return (
            <div className='creategraphsstep1__buttons'>
                {renderExpensesButton()}
                {renderIncomesButton()}
                {renderSavingsButton()}
            </div>
        )
    }

    const renderExpensesButton = () => {
        if(graphTypeAccess === "ALL" || graphTypeAccess === "ONLY_EXPENSES") {
            return (
                <button
                    className={graphOptions.graphType === 'EXPENSES' ? 'selected' : 'not_selected'}
                    onClick={() => handleSelectedType('EXPENSES')}
                >
                    <TrendingDownRoundedIcon fontSize='large'/>
                    <p>Expenses</p>
                </button>
            )
        } else {
            return (
                <button
                    disabled={true} className='not_selected'
                >
                    <TrendingDownRoundedIcon fontSize='large'/>
                    <p>Expenses</p>
                </button>
            )
        }
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
        if(graphTypeAccess === "ALL" || graphTypeAccess === "ONLY_INCOMES") {
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
                <div className='creategraphsstep1__type'>
                    <h2>Type</h2>
                    <p>What aspect of your finances would you like to see.</p>
                    {renderGraphTypeButtons()}
                </div>
                <div className='creategraphsstep1__tag'>
                    <h2>Frequency</h2>
                    <p>How often your graph will update automatically in your dashboard.</p>
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
                {/* <button className="creategraphbox__backbutton">
                    Back
                </button> */}
                <button className="creategraphbox__nextbutton" onClick={onNext}>
                    Next
                </button>
            </div>
        </div>  
    );
}