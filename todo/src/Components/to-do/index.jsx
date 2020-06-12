import React, { Component } from 'react'
import Add from '../add'
import Table from '../table'
import {tableList} from '../../Constants/table-list'

class Todo extends Component{
    constructor(props){
        super(props);
        this.state = {
            tableList: tableList,
            message: null,
            variable: tableList.length,
            sort: true,
            edit: false,
            rowNumber: null,
            schimbare: null
        }
    }
    /* Functie pentru editare - se salveaza in variabila dummy schimbare variabila ce contine datele de la tastatura*/
    schimbare = (e) =>{
        this.setState({schimbare: e.target.value})
    }
    /* Functie pentru editare - transmite id-ul task-ului ce trebuie editat*/
    handleEdit = (id) => {
        this.setState({
            edit:true,
            rowNumber: id
        })
    }
    /* Functie pentru salvarea task-ului editat
     - itereaza prin lista de task-uri pentru a gasi id-ul task-ului ce trebuie editat si ii atribuie valoarea variabilei schimbare*/
    handleSaveNewInput = (id) => {
        if(this.state.schimbare !== ""){
            this.setState( () => {
                const table = this.state.tableList.map(item => {
                    if(id === item.id) 
                        return {
                            ...item,
                            task: this.state.schimbare
                        }
                    return item;
                })
                return {
                    tableList: table,
                    edit: false
                }
            })
        }
         
    }
    /* Functie pentru sortare - implicit sortare ascendenta apoi descendenta */
    sortClick = (key) => {
      
		if (this.state.sort === true) {
			const table = [...this.state.tableList].sort((a, b) => {
                
				if (a[key] < b[key]) return -1;
				if (a[key] > b[key]) return 1;
				return 0;
			});

			this.setState(prevState => ({
				sort: !prevState.sort,
				tableList: table
			})
			)
		}

		else {
			const table = [...this.state.tableList].sort((a, b) => {
				if (a[key] > b[key]) return -1;
				if (a[key] < b[key]) return 1;
				return 0;
			});

			this.setState(prevState => ({
				sort: !prevState.sort,
				tableList: table
			})

			)
		}
    }
    /* Functie pentru adaugarea unui nou task */
    addNewRow = (event) => {
        
        const e = event.charAt(0).toUpperCase() + event.slice(1).toLowerCase();
        let existingObj = this.state.tableList.find(item => item.task === e);
        if (existingObj !== undefined && event !== ''){
            this.setState({
                message: 'Already in list',
                
            })
            existingObj = undefined;

        }

        else if (existingObj === undefined && event !== ""){

            const newObj = {
                id: this.state.variable+1,
                date: new Date(),
                task: e,
                status: false
            }

            this.setState({
                tableList: [...this.state.tableList,newObj],
                message: null,
                variable: newObj.id
                
            })
        }
    }
    /* Functie pentru selectie - marcheaza task-ul ca fiind selectat */
    handleChange = (id) => {
        this.setState(prevState => {
            const updatedTable = prevState.tableList.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        status: !item.status
                    }
                }
                return item
            })
            return {
                tableList: updatedTable
            }
            
        })

    }
    /* Functie pentru stergerea task-ului */
    removeRow = (index) => {
        const table = this.state.tableList.filter(item => item.id !== index)
        this.setState({tableList: table})
    }

    render(){
    return(
        <div>
            <Add  message={this.state.message} addNewRow={this.addNewRow}/>
            <Table edit={this.state.edit} 
            handleEdit={this.handleEdit}
            sortClick={this.sortClick}
            handleChange = {this.handleChange}
            remove = {this.removeRow}
            tableList={this.state.tableList}
            rowNumber={this.state.rowNumber}
            schimbare={this.schimbare}
            handleSaveNewInput={this.handleSaveNewInput}/>
        </div>
    )
    }
}
export default Todo