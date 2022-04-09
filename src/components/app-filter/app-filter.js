import "./app-filter.css"

const AppFilter = (props) => {
    const buttonData = [
        {name: 'all', label: 'Все сотрудники'},
        {name: 'rise', label: 'На повышение'},
        {name: 'salary', label: 'З/П больше 1000$'},
    ]

    const buttons = buttonData.map(({name, label}) => {
        const active = props.filter === name;
        const clazz = active ? 'btn-light' : 'btn-outline-light';
        return (
            <button type='button'
                    className={`btn ${clazz}`}
                    key={name}
                    onClick={() => props.onFilter(name)}>
                    {label}
            </button>
        )
    })

    return (
        <div className="btn-group">
            {buttons}
        </div>
    )
}

// <button
//                 className="btn btn-light"
//                 
//                 onClick={() => props.onFilter('all')}>
//                     Все сотрудники
//             </button>
//             <button
//                 className="btn btn-outline-light"
//                 type='button'
//                 onClick={() => props.onFilter('rise')}>
//                     На повышение
//             </button>
//             <button
//                 className="btn btn-light"
//                 type='button'
//                 onClick={() => props.onFilter('salary')}>
//                     З/П больше 1000$
//             </button>

export default AppFilter;