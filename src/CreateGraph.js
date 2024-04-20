import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import Select from 'react-select';
import { createDesiredGraph } from './RequestUtils';
import { useState } from 'react';

export default function CreateGraph({ botId, updateStateFunction }) {

    const [selectedTag, setSelectedTag] = useState('DAILY');
    const [selectedType, setSelectedType] = useState('Gastos en los últimos 7 días');

    const tagoptions = [
        {value: 'DAILY', label: 'Diariamente'},
        {value: 'WEEKLY', label: 'Semanalmente'},
        {value: 'MONTHLY', label: 'Mensualmente'},
    ]

    const typeoptions = [
        {value: 'Gastos en los últimos 7 días', label: 'Gastos en los últimos 7 días'},
        {value: 'Gastos en los últimos 7 días por categoría', label: 'Gastos en los últimos 7 días por categoría'},
        {value: 'Gastos en los últimos 30 días', label: 'Gastos en los últimos 30 días'},
        {value: 'Gastos en los últimos 30 días por categoría', label: 'Gastos en los últimos 30 días por categoría'},
        {value: 'Ingresos desde noviembre por categoría', label: 'Ingresos desde noviembre por categoría'},
        {value: 'Ahorros desde noviembre', label: 'Ahorros desde noviembre'},
        {value: 'Ahorros desde noviembre acumulado', label: 'Ahorros desde noviembre acumulado'},
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
                <p>Nueva gráfica</p>
                <AddCircleOutlineSharpIcon />
            </button>
            <div className='usergraph__createtagrow'>
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
                    options={typeoptions}
                    onChange={function (newType) {
                        setSelectedType(newType.value)
                    }}
                />
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
    )
}