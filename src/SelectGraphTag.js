import Select from 'react-select';
import { updateDesiredGraph } from './RequestUtils';
import { delay } from './Utils';

export default function SelectGraphTag({ desiredGraphId, userId, graphType, defaultTag, updateStateFunction }) {

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
                            userId: userId,
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