import React, {useState, useEffect } from 'react';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';

export default function CreateGraphStep2({ graphOptions, onPrev, onNext, onChange, expensesCategoriesLoading, expensesCategories, incomesBankAccountsLoading, incomesBankAccounts, incomesSourcesLoading, incomesSources }) {

    const handleSelectedOption = (option) => {
        // Update data in parent, to send all together
        onChange({ filterCategories: option });
    }

    const renderGraphTypeText = () => {
        if(graphOptions.graphType === 'EXPENSES') {
            return (
                <div className='creategraphsstep2__graphTypeText'>
                    <h2>Expenses</h2>
                    <TrendingDownRoundedIcon fontSize='medium'/>
                </div>
            )
        } else {
            return (
                <div className='creategraphsstep2__graphTypeText'>
                    <h2>Incomes</h2>
                    <AttachMoneyRoundedIcon fontSize='medium'/>
                </div>
            )
        }
    }

    const renderFilterButtons = () => {
        if(graphOptions.graphType === 'EXPENSES') {
            if(expensesCategoriesLoading) {
                return renderExpensesOptionsLoading()
            } else {
                return renderExpensesOptionsFinishedLoading()
            }
        } else {
            if(incomesBankAccountsLoading || incomesSourcesLoading) {
                return renderIncomesOptionsLoading()
            } else {
                return renderIncomesOptionsFinishedLoading()
            }
        }
    }

    const renderExpensesOptionsFinishedLoading = () => {
        return (
            <div className='creategraphsstep2__buttons'>
                <button
                    className={graphOptions.filterCategories === 'ALL' ? 'selected' : 'not_selected'}
                    onClick={() => handleSelectedOption({category: 'ALL', type: 'SIMPLE'})}
                >

                </button>
            </div>
        )
    }

    return (
        <div className='creategraphbox__contentandlow'>
            <div className='creategraphsstep__content'>
                <div className='creategraphsstep2__box'>
                    {renderGraphTypeText()}
                    {renderFilterButtons()}
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