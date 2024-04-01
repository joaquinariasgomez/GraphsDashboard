import Select from 'react-select';
import { updateDesiredGraph } from './RequestUtils';

export default function SelectGraphTag({ desiredGraphId, userId, graphType, defaultTag }) {

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
            onChange={function (newTag) {
                updateDesiredGraph(
                    desiredGraphId,
                    JSON.stringify(
                        {
                            userId: userId,
                            tag: newTag.value,
                            type: graphType
                        }
                    )
                )
            }}
        />
    )
}
// TODO: quizas hacer esto con un dispatcher (algo como el useGraphStateValue de GraphProject_Frontend)
// Fijarme en SelectLineType de GraphProject_Frontend