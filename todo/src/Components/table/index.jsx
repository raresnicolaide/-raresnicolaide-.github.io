import React from 'react';
import './table.css' 
import {tableHead} from '../../Constants/table-head'
import { mdiDelete } from '@mdi/js';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Icon from '@mdi/react';
/*
    Componenta ce afiseaza tabelul, primeste constantele table-head (valorile afisate pe capul de tabel)
    si table-list (valorile implicite din tabel). Functiile prevazute sunt:
    - La click pe capul de tabel se va face o sortare ascendenta si la al doilea click una descendenta
    - Selectia unui task determina efectul line-through
    - Posibilitatea de stergere, editare si salvare a textului editat
*/
function Table(props){
   
    return(
        <div>
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            {tableHead.map((item,i)=>
                            <th onClick={()=>props.sortClick(item)} key={i} className='table_data'>{item}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {props.tableList.map((item,i)=>
                        <tr key={i}>
                            <td><input 
                                type="checkbox" 
                                checked={item.status} 
                                onChange={() => props.handleChange(item.id)}/>
                            </td>
                            <td className='table_data'>{item.date.getDate()+'/'+(item.date.getMonth()+1)+'/'+item.date.getFullYear()}</td>
                                {props.rowNumber === item.id ?
                                    <td className={item.status === true ? 'table_data_task' : 'table_data'}>{props.edit ? <input placeholder="Edit" className="input" onChange={(e)=>props.schimbare(e)} type='text'/> : item.task} <EditIcon className="input_icon" onClick={() => props.handleEdit(item.id)}/><SaveIcon className="input_icon" onClick={()=> props.handleSaveNewInput(item.id)}/></td>
                                    : <td className={item.status === true ? 'table_data_task' : 'table_data'}>{item.task} <EditIcon className="input_icon"  onClick={() => props.handleEdit(item.id)}/></td>
                                }
                                    <td className="table_data"> <Icon className="remove" path={mdiDelete} onClick={() => props.remove(item.id)} size={1} /></td>
                        </tr>
                        )}
                    </tbody>
                </table>            
            </div>
        </div>
    )
}
export default Table;