import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import Select from 'react-select';
import { createDesiredGraph } from './RequestUtils';
import { useEffect, useState } from 'react';

export default function CreateGraph({ botId, updateStateFunction }) {

    const [selectedTag, setSelectedTag] = useState('DAILY');
    const [selectedType, setSelectedType] = useState('Gastos en los últimos 7 días');

    const tagoptions = [
        {value: 'DAILY', label: 'Daily'},
        {value: 'WEEKLY', label: 'Weekly'},
        {value: 'MONTHLY', label: 'Monthly'},
    ]

    const typeoptions = [
        {value: 'Gastos en los últimos 7 días', label: 'Gastos en los últimos 7 días'},
        {value: 'Gastos en los últimos 7 días por categoría', label: 'Gastos en los últimos 7 días por categoría'},
        {value: 'Gastos en los últimos 30 días', label: 'Gastos en los últimos 30 días'},
        {value: 'Gastos en los últimos 30 días por categoría', label: 'Gastos en los últimos 30 días por categoría'},
        {value: 'Ingresos desde noviembre por categoría', label: 'Ingresos desde noviembre por categoría'},
        {value: 'Ingresos por categoría', label: 'Ingresos por categoría'},
        {value: 'Ingresos en 2024 por categoría', label: 'Ingresos en 2024 por categoría'},
        {value: 'Ahorros desde noviembre', label: 'Ahorros desde noviembre'},
        {value: 'Ahorros desde noviembre acumulado', label: 'Ahorros desde noviembre acumulado'},
        {value: 'Ahorros', label: 'Ahorros'},
        {value: 'Ahorros en 2024', label: 'Ahorros en 2024'},
        {value: 'Ahorros acumulado', label: 'Ahorros acumulado'},
        {value: 'Ahorros en 2024 acumulado', label: 'Ahorros en 2024 acumulado'},
    ]

    const extratypeoptions = [
        {value: 'Gastos en los últimos 7 días', label: 'Gastos en los últimos 7 días'},
        {value: 'Gastos en los últimos 7 días por categoría', label: 'Gastos en los últimos 7 días por categoría'},
        {value: 'Gastos en los últimos 30 días', label: 'Gastos en los últimos 30 días'},
        {value: 'Gastos en los últimos 30 días por categoría', label: 'Gastos en los últimos 30 días por categoría'},
        {value: 'Ingresos desde noviembre por categoría', label: 'Ingresos desde noviembre por categoría'},
        {value: 'Ingresos por categoría', label: 'Ingresos por categoría'},
        {value: 'Ingresos en 2024 por categoría', label: 'Ingresos en 2024 por categoría'},
        {value: 'Ahorros desde noviembre', label: 'Ahorros desde noviembre'},
        {value: 'Ahorros desde noviembre acumulado', label: 'Ahorros desde noviembre acumulado'},
        {value: 'Ahorros', label: 'Ahorros'},
        {value: 'Ahorros en 2024', label: 'Ahorros en 2024'},
        {value: 'Ahorros acumulado', label: 'Ahorros acumulado'},
        {value: 'Ahorros en 2024 acumulado', label: 'Ahorros en 2024 acumulado'},
        {value: 'Evolución de peso', label: 'Evolución de peso'},
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