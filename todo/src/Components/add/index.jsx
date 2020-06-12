import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { mdiClose, mdiMessagePlusOutline } from '@mdi/js';
import Icon from '@mdi/react';
import BlockIcon from '@material-ui/icons/Block';
import './add.css'
/*
   Componenta Add (ce utilizeaza react hooks) reprezinta inputul prin care se adauga noi task-uri in tabel
  -Functie ce reseteaza continutul inputlui
  -Functie ce salveaza datele de la tastatura 
  */
const Add = (props) => {
	const [addNewEntry,setAddNewEntry] = useState('');
	
    const resetNewEntry = () => {
        setAddNewEntry('');
    }

    const handleChange = (event) => {
        const entry = event.target.value;

        setAddNewEntry(entry);
    }
   
    
    return(
        <div>
            <div className="add-new-entry">
				<div className="add-new-entry-input">
					<form noValidate autoComplete="off">
                        
						<TextField id="add-new-entry-input"
							value={addNewEntry}
							onChange={handleChange}
							label="Add new entry" />

						<Icon
							className="add-new-entry-input-icon"
							onClick={resetNewEntry}
							path={mdiClose}
							size={1} />

						<Icon
							className="add-new-entry-input-icon"
							disabled={!addNewEntry}
							onClick={() => { props.addNewRow(addNewEntry) }}
							path={mdiMessagePlusOutline}
							size={1} />
					</form>
				</div>
            </div>
            <div className='message'>
                {props.message !== null ? <BlockIcon className="block"/> : null}
                {props.message}
            </div>
        </div>
    
   
    )
}
export default Add;