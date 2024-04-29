import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import Select from 'react-select';
import { createDesiredGraph } from './RequestUtils';
import { useEffect, useState } from 'react';

export default function CreateGraph({ botId, updateStateFunction }) {

    const [selectedTag, setSelectedTag] = useState('DAILY');
    const [selectedType, setSelectedType] = useState('Expenses in the last 7 days');

    const tagoptions = [
        {value: 'DAILY', label: 'Daily'},
        {value: 'WEEKLY', label: 'Weekly'},
        {value: 'MONTHLY', label: 'Monthly'},
    ]

    const typeoptions = [
        {value: 'Expenses', label: 'Expenses'},
        {value: 'Expenses by category', label: 'Expenses by category'},
        {value: 'Expenses in the last 7 days', label: 'Expenses in the last 7 days'},
        {value: 'Expenses in the last 7 days by category', label: 'Expenses in the last 7 days by category'},
        {value: 'Expenses in the last 30 days', label: 'Expenses in the last 30 days'},
        {value: 'Expenses in the last 30 days by category', label: 'Expenses in the last 30 days by category'},
        {value: 'Incomes', label: 'Incomes'},
        {value: 'Incomes by category', label: 'Incomes by category'},
        {value: 'Incomes in 2024 by category', label: 'Incomes in 2024 by category'},
        {value: 'Savings', label: 'Savings'},
        {value: 'Savings in 2024', label: 'Savings in 2024'},
        {value: 'Cumulative savings', label: 'Cumulative savings'},
        {value: 'Cumulative savings in 2024', label: 'Cumulative savings in 2024'},
    ]

    const extratypeoptions = [
        {value: 'Expenses', label: 'Expenses'},
        {value: 'Expenses by category', label: 'Expenses by category'},
        {value: 'Expenses in the last 7 days', label: 'Expenses in the last 7 days'},
        {value: 'Expenses in the last 7 days by category', label: 'Expenses in the last 7 days by category'},
        {value: 'Expenses in the last 30 days', label: 'Expenses in the last 30 days'},
        {value: 'Expenses in the last 30 days by category', label: 'Expenses in the last 30 days by category'},
        {value: 'Incomes', label: 'Incomes'},
        {value: 'Incomes since november by category', label: 'Incomes since november by category'},
        {value: 'Incomes by category', label: 'Incomes by category'},
        {value: 'Incomes in 2024 by category', label: 'Incomes in 2024 by category'},
        {value: 'Savings since november', label: 'Savings since november'},
        {value: 'Savings', label: 'Savings'},
        {value: 'Savings in 2024', label: 'Savings in 2024'},
        {value: 'Cumulative savings since november', label: 'Cumulative savings since november'},
        {value: 'Cumulative savings', label: 'Cumulative savings'},
        {value: 'Cumulative savings in 2024', label: 'Cumulative savings in 2024'},
        {value: 'Weight and calories evolution', label: 'Weight and calories evolution'},
    ]

    return (
        <div className='usergraph__item usergraph__createcontainer'>
            <button className='usergraph__createbutton' onClick={async function() {
                const apiResponse = await createDesiredGraph(
                    JSON.stringify(
                        {
                            userId: "", // Will be filled up by backend
                            botId: botId,
                            tag: selectedTag,
                            type: selectedType
                        }
                    )
                )
                if(apiResponse) {
                    updateStateFunction()
                }
            }}>
                <p>New graph</p>
                <AddCircleOutlineSharpIcon />
            </button>
            <div className='usergraph__createtagrow'>
                <div className='usergraph__createtag__left'>
                    <Select
                        className='selectgraphtag'
                        defaultValue={typeoptions[0]}
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
                        options={botId === "d948e9fa-cfd9-4ca7-bfec-b2cfa820364a" ? extratypeoptions : typeoptions}
                        onChange={function (newType) {
                            setSelectedType(newType.value)
                        }}
                    />
                </div>
                <div className='usergraph__createtag__right'>
                    <Select
                        className='selectgraphtag'
                        defaultValue={tagoptions[0]}
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
                        options={tagoptions}
                        onChange={function (newTag) {
                            setSelectedTag(newTag.value)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}