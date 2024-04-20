import Select from 'react-select';

export default function FakeSelectGraphTag({ defaultTag }) {

    const options = [
        {value: 'DAILY', label: 'Diariamente'},
        {value: 'WEEKLY', label: 'Semanalmente'},
        {value: 'MONTHLY', label: 'Mensualmente'},
    ]

    return (
        <Select
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
        />
    )
}