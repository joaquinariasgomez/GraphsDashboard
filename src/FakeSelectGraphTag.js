import Select from 'react-select';

export default function FakeSelectGraphTag({ defaultTag }) {

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
        />
    )
}