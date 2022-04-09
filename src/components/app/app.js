import { Component } from 'react';

import AppInfo from '../app-info/app-info'
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter'
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import "./app.css";

class App extends Component {

    constructor(props) {
        super(props);
            this.state = {
                data : [
                {name: 'Jim Hilpert', salary:'900', increase: true, rise: true, id: 1},
                {name: 'Pam Beesly', salary:'800', increase: false, rise: false, id: 2},
                {name: 'Michael Scott', salary:'1600', increase: false, rise: false, id: 3}
                ],
                term: '',
                filter: 'all',
            }
            this.maxId = 4;
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    onChangeSalary = (id, salary) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, salary: salary}
                }
                return item;
                console.log(salary);
            })
        }))
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data : data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        })
    }

    filterEmp = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'salary':
                return items.filter(item => item.salary > 1000)
            default:
                return items;
        }
        
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    onFilter = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const employees = data.length;
        const increased = data.filter(item => item.increase).length;
        const visibleData = this.filterEmp((this.searchEmp(data, term)), filter);

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch = {this.onUpdateSearch}/>
                    <AppFilter onFilter={this.onFilter} filter={filter}/>
                </div>
    
                <EmployeesList
                data={visibleData}
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}
                onChangeSalary={this.onChangeSalary}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
    
}

export default App;
