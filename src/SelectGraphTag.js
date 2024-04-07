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