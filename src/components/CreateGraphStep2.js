import React, {useState, useEffect } from 'react';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import Select from 'react-select';
import SyncLoader from "react-spinners/SyncLoader";

export default function CreateGraphStep2({ graphOptions, onPrev, onNext, onChange, expensesCategoriesLoading, expensesCategories, incomesBankAccountsLoading, incomesBankAccounts, incomesSourcesLoading, incomesSources }) {

    function getSelectOptionsFromExpensesCategories(input) {
        return input.map(element => {
            return {value: element, label: element};
        });
    }

    function getSelectOptionFromExpensesCategory(input) {
        return {value: input, label: input};
    }

    const handleSelectedOption = (option) => {
        // Update data in parent, to send all together
        onChange({ filterCategories: option });
    }

    const stopPropagation = (event) => {
        event.stopPropagation();
      };

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
                // return renderIncomesOptionsLoading()
            } else {
                // return renderIncomesOptionsFinishedLoading()
            }
        }
    }

    const renderExpensesOptionsLoading = () => {
        return (
            <div className='creategraphsstep2__buttons'>
                <button
                    disabled={true} className='not_selected'
                >
                    {/* TODO: Add graph here */}
                    <p>All expenses</p>
                    <SyncLoader size={10}/>
                </button>
                <button
                    disabled={true} className='not_selected'
                >
                    {/* TODO: Add graph here */}
                    <p>Grouped by category</p>
                    <SyncLoader size={10}/>
                </button>
                <button
                    disabled={true} className='not_selected'
                >
                    {/* TODO: Add graph here */}
                    <p>Specific category</p>
                    {/* TODO: Add slider to select here */}
                    <SyncLoader size={10}/>
                </button>
            </div>
        )
    }

    const renderExpensesOptionsFinishedLoading = () => {
        return (
            <div className='creategraphsstep2__buttons'>
                <button
                    className={graphOptions.filterCategories.type === 'SUM' ? 'selected' : 'not_selected'}
                    onClick={() => handleSelectedOption({type: 'SUM', category: ''})}
                >
                    {/* TODO: Add graph here */}
                    <p>All expenses</p>
                </button>
                <button
                    className={graphOptions.filterCategories.type === 'BY CATEGORY' ? 'selected' : 'not_selected'}
                    onClick={() => handleSelectedOption({type: 'BY CATEGORY', category: ''})}
                >
                    {/* TODO: Add graph here */}
                    <p>Grouped by category</p>
                </button>
                <button
                    className={graphOptions.filterCategories.type === 'SPECIFIC CATEGORY' ? 'selected' : 'not_selected'}
                    // onClick={() => handleSelectedOption({type: 'SPECIFIC CATEGORY', category: ''})}
                >
                    {/* TODO: Add graph here */}
                    <p>Specific category</p>
                    <div className='createcategoryselect' onClick={stopPropagation}>
                        <Select
                            className='selectgraphtag'
                            defaultValue={getSelectOptionFromExpensesCategory(graphOptions.filterCategories.category)}
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
                            options={getSelectOptionsFromExpensesCategories(expensesCategories)}
                            onChange={function (selectedCategory) {
                                handleSelectedOption({type: 'SPECIFIC CATEGORY', category: selectedCategory.value})
                            }}
                        />
                    </div>
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