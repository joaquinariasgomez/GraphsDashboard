import React, {useState, useEffect } from 'react';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import Select from 'react-select';
import SyncLoader from "react-spinners/SyncLoader";

export default function CreateGraphStep2({ graphOptions, onPrev, onNext, onChange, expensesCategoriesLoading, expensesCategories, incomesBankAccountsLoading, incomesBankAccounts, incomesSourcesLoading, incomesSources }) {

    function getSelectOptionsFrom(input) {
        return input.map(element => {
            return {value: element, label: element};
        });
    }

    function getSelectOptionFrom(input) {
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
                return renderIncomesOptionsLoading()
            } else {
                return renderIncomesOptionsFinishedLoading()
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
                    onClick={() => handleSelectedOption({type: 'SUM', category: 'Select category'})}
                >
                    {/* TODO: Add graph here */}
                    <p>All expenses</p>
                </button>
                <button
                    className={graphOptions.filterCategories.type === 'BY CATEGORY' ? 'selected' : 'not_selected'}
                    onClick={() => handleSelectedOption({type: 'BY CATEGORY', category: 'Select category'})}
                >
                    {/* TODO: Add graph here */}
                    <p>Grouped by category</p>
                </button>
                <button
                    className={graphOptions.filterCategories.type === 'SPECIFIC CATEGORY' ? 'withselect selected' : 'withselect not_selected'}
                >
                    {/* TODO: Add graph here */}
                    <p className='withselect'>Specific category</p>
                    <div className='createcategoryselect' onClick={stopPropagation}>
                        <Select
                            className='selectgraphtag'
                            defaultValue={getSelectOptionFrom(graphOptions.filterCategories.category)}
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
                            options={getSelectOptionsFrom(expensesCategories)}
                            onChange={function (selectedCategory) {
                                handleSelectedOption({type: 'SPECIFIC CATEGORY', category: selectedCategory.value})
                            }}
                        />
                    </div>
                </button>
            </div>
        )
    }

    const renderIncomesOptionsLoading = () => {
        return (
            <div className='creategraphsstep2__buttons incomes'>
                <button
                    disabled={true} className='not_selected'
                >
                    {/* TODO: Add graph here */}
                    <p>All incomes</p>
                    <SyncLoader size={10}/>
                </button>
                <div className='creategraphsstep2__verticalbuttons'>
                    <button
                        disabled={true} className='not_selected'
                    >
                        {/* TODO: Add graph here */}
                        <p>Grouped by bank account</p>
                        <SyncLoader size={10}/>
                    </button>
                    <button
                        disabled={true} className='not_selected'
                    >
                        {/* TODO: Add graph here */}
                        <p>Grouped by income source</p>
                        <SyncLoader size={10}/>
                    </button>
                </div>
                <div className='creategraphsstep2__verticalbuttons'>
                    <button
                        disabled={true} className='not_selected'
                    >
                        {/* TODO: Add graph here */}
                        <p>Specific bank account</p>
                        <SyncLoader size={10}/>
                    </button>
                    <button
                        disabled={true} className='not_selected'
                    >
                        {/* TODO: Add graph here */}
                        <p>Specific income source</p>
                        <SyncLoader size={10}/>
                    </button>
                </div>
            </div>
        )
    }

    const renderIncomesOptionsFinishedLoading = () => {
        return (
            <div className='creategraphsstep2__buttons incomes'>
                <button
                    className={graphOptions.filterCategories.type === 'SUM' ? 'selected' : 'not_selected'}
                    onClick={() => handleSelectedOption({type: 'SUM', category: ''})}
                >
                    {/* TODO: Add graph here */}
                    <p>All incomes</p>
                </button>
                <div className='creategraphsstep2__verticalbuttons'>
                    <button
                        className={graphOptions.filterCategories.type === 'BY BANKACCOUNT' ? 'selected' : 'not_selected'}
                        onClick={() => handleSelectedOption({type: 'BY BANKACCOUNT', category: 'Select category'})}
                    >
                        {/* TODO: Add graph here */}
                        <p>Grouped by bank account</p>
                    </button>
                    <button
                        className={graphOptions.filterCategories.type === 'BY INCOMESOURCE' ? 'selected' : 'not_selected'}
                        onClick={() => handleSelectedOption({type: 'BY INCOMESOURCE', category: 'Select category'})}
                    >
                        {/* TODO: Add graph here */}
                        <p>Grouped by income source</p>
                    </button>
                </div>
                <div className='creategraphsstep2__verticalbuttons'>
                    <button
                        className={graphOptions.filterCategories.type === 'SPECIFIC BANKACCOUNT' ? 'withselect selected' : 'withselect not_selected'}
                    >
                        {/* TODO: Add graph here */}
                        <p className='withselect'>Specific bank account</p>
                        <div className='createcategoryselect' onClick={stopPropagation}>
                            <Select
                                className='selectgraphtag'
                                defaultValue={getSelectOptionFrom(graphOptions.filterCategories.category)}
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
                                options={getSelectOptionsFrom(incomesBankAccounts)}
                                onChange={function (selectedCategory) {
                                    handleSelectedOption({type: 'SPECIFIC BANKACCOUNT', category: selectedCategory.value})
                                }}
                            />
                        </div>
                    </button>
                    <button
                        className={graphOptions.filterCategories.type === 'SPECIFIC INCOMESOURCE' ? 'withselect selected' : 'withselect not_selected'}
                    >
                        {/* TODO: Add graph here */}
                        <p className='withselect'>Specific income source</p>
                        <div className='createcategoryselect' onClick={stopPropagation}>
                            <Select
                                className='selectgraphtag'
                                defaultValue={getSelectOptionFrom(graphOptions.filterCategories.category)}
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
                                options={getSelectOptionsFrom(incomesSources)}
                                onChange={function (selectedCategory) {
                                    handleSelectedOption({type: 'SPECIFIC INCOMESOURCE', category: selectedCategory.value})
                                }}
                            />
                        </div>
                    </button>
                </div>
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