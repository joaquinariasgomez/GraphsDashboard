import React, {useState, useEffect } from 'react';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';

export default function CreateGraphStep1({ onNext, onChange }) {

    // State to manage form data
    const [graphOptions, setGraphOptions] = useState({
        graphType: 'EXPENSES',
        graphTag: 'DAILY'
    });

    useEffect(() => {
        console.log("graphOptions data: ", graphOptions);
    }, [graphOptions]);

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

    return (
        <div className='creategraphbox__contentandlow'>
            <div className='creategraphsstep__content'>
                <div className='creategraphsstep1__type'>
                    <h2>Type</h2>
                    <p>What aspect of your finances would you like to see.</p>
                    <div className='creategraphsstep1__buttons'>
                        <button
                            className={graphOptions.graphType === 'EXPENSES' ? 'selected' : 'not_selected'}
                            onClick={() => handleSelectedType('EXPENSES')}
                        >
                            <TrendingDownRoundedIcon fontSize='large'/>
                            <p>Expenses</p>
                        </button>
                        <button
                            className={graphOptions.graphType === 'INCOMES' ? 'selected' : 'not_selected'}
                            onClick={() => handleSelectedType('INCOMES')}
                        >
                            <AttachMoneyRoundedIcon fontSize='large'/>
                            <p>Incomes</p>
                        </button>
                        <button
                            className={graphOptions.graphType === 'SAVINGS' ? 'selected' : 'not_selected'}
                            onClick={() => handleSelectedType('SAVINGS')}
                        >
                            <TrendingUpRoundedIcon fontSize='large'/>
                            <p>Savings</p>
                        </button>
                    </div>
                </div>
                <div className='creategraphsstep1__tag'>
                    <h2>Frequency</h2>
                    <p>How often your graph will update automatically in your dashboard.</p>
                    <div className='creategraphsstep1__buttons'>
                        <button
                            className={graphOptions.graphType === 'DAILY' ? 'selected' : 'not_selected'}
                            onClick={() => handleSelectedTag('DAILY')}
                        >
                            Daily
                        </button>
                        <button
                            className={graphOptions.graphType === 'WEEKLY' ? 'selected' : 'not_selected'}
                            onClick={() => handleSelectedTag('WEEKLY')}
                        >
                            Weekly
                        </button>
                        <button
                            className={graphOptions.graphType === 'MONTHLY' ? 'selected' : 'not_selected'}
                            onClick={() => handleSelectedTag('MONTHLY')}
                        >
                            Monthly
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