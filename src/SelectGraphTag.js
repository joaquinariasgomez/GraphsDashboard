import Select from 'react-select';
import { updateDesiredGraph } from './RequestUtils';

export default function SelectGraphTag({ desiredGraphId, botId, graphOptions, defaultTag, updateStateFunction }) {

    const options = [
        {value: 'DAILY', label: 'Daily'},
        {value: 'WEEKLY', label: 'Weekly'},
        {value: 'MONTHLY', label: 'Monthly'},
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
                let newGraphOptions = graphOptions;
                newGraphOptions.graphTag = newTag.value;
                const apiResponse = await updateDesiredGraph(
                    desiredGraphId,
                    JSON.stringify(
                        {
                            userId: "", // Will be filled up by backend
                            botId: botId,
                            graphOptions: newGraphOptions,
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