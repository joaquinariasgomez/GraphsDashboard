import React, {useState, useEffect } from 'react';

export default function CreateGraphStep2({ graphOptions, onPrev, onNext, onChange }) {

    const handleSelectedType = (type) => {
        // Update data in parent, to send all together
        onChange({ graphType: type });
    }

    const handleSelectedTag = (tag) => {
        // Update data in parent, to send all together
        onChange({ graphTag: tag });
    }

    return (
        <div className='creategraphbox__contentandlow'>
            <div className='creategraphsstep__content'>
                <div className='creategraphsstep1__type'>
                    <button
                        className={graphOptions.graphType === 'EXPENSES' ? 'selected' : 'not_selected'}
                        onClick={() => handleSelectedType('EXPENSES')}
                    >
                        Button 1: Expenses
                    </button>
                    <button
                        className={graphOptions.graphType === 'INCOMES' ? 'selected' : 'not_selected'}
                        onClick={() => handleSelectedType('INCOMES')}
                    >
                        Button 2: Incomes
                    </button>
                    <button
                        className={graphOptions.graphType === 'SAVINGS' ? 'selected' : 'not_selected'}
                        onClick={() => handleSelectedType('SAVINGS')}
                    >
                        Button 3: Savings
                    </button>
                </div>
                <div className='creategraphsstep1__tag'>
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
            <div className="creategraphbox__nextbackrow">
                <button className="creategraphbox__backbutton" onClick={onPrev}>
                    Back
                </button>
                <button className="creategraphbox__nextbutton" onClick={onNext}>
                    Next
                </button>
            </div>
        </div>  
    );
}