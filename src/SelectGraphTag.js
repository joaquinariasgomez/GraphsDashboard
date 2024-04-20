import Select from 'react-select';
import { updateDesiredGraph } from './RequestUtils';

export default function SelectGraphTag({ desiredGraphId, botId, graphType, defaultTag, updateStateFunction }) {

    const options = [
        {value: 'DAILY', label: 'Diariamente'},
        {value: 'WEEKLY', label: 'Semanalmente'},
        {value: 'MONTHLY', label: 'Mensualmente'},
    ]

    return (
        <Select
            className='selectgraphtag'
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
            defaultValue={
                options.filter((option) => option.value === defaultTag)
            }
            options={options}
            onChange={async function (newTag) {
                const apiResponse = await updateDesiredGraph(
                    desiredGraphId,
                    JSON.stringify(
                        {
                            botId: botId,
                            userId: "", // Will be filled up by backend
                            tag: newTag.value,
                            type: graphType
                        }
                    )
                )
                if(apiResponse) {
                    updateStateFunction()
                }
            }}
        />
    )
}