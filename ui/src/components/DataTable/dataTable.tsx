import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Stack from 'react-bootstrap/Stack';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { GridApi } from 'ag-grid-community'; // Grid and Column API types
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Map from '../Map/Map';
import MovementForm from '../CreateMovement/CreateMovement';
import PopulationForm from '../CreatePopulation/PopulationForm';
import greenLocationPin from "../../assets/greenLocationPin.png"
import redLocationPin from "../../assets/redLocationPin.png"
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS
import './dataTable.scss'
import config from '../../config';

function titleCase(str :any) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

interface DataTableProps {
    tableType: string;
  }

  


const DataTable: React.FC<DataTableProps> = (props) => {
  const gridRef = useRef<AgGridReact>(null); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState<any[]>(); // Set rowData to Array of Objects, one Object per Row
  const { user, logout, getToken } = useAuth();
  const navigate = useNavigate();

  const [showVisualise, setShowVisualise] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleVisualiseClose = () => setShowVisualise(false);
  const handleVisualiseShow = () => setShowVisualise(true);

  const handleFormClose = () => setShowForm(false);
  const handleFormShow = () => setShowForm(true);

  
  


  // Each Column Definition results in one Column.
  const columnDefs = useMemo(
    () => props.tableType==='movements' ?[
      { headerName: 'ID', field: 'Id', filter: true },
      { headerName: 'Account Company', field: 'account_company', filter: true },
      { headerName: 'Movement Reason', field: 'new_movementreason', filter: true },
      { headerName: 'Species', field: 'new_species', filter: true },
      { headerName: 'Origin Address', field: 'new_originaddress', filter: true },
      { headerName: 'Origin City', field: 'new_origincity', filter: true },
      { headerName: 'Origin Name', field: 'new_originname', filter: true },
      { headerName: 'Origin Postal Code', field: 'new_originpostalcode', filter: true },
      { headerName: 'Origin State', field: 'new_originstate', filter: true },
      { headerName: 'Destination Address', field: 'new_destinationaddress', filter: true },
      { headerName: 'Destination City', field: 'new_destinationcity', filter: true },
      { headerName: 'Destination Name', field: 'new_destinationname', filter: true },
      { headerName: 'Destination Postal Code', field: 'new_destinationpostalcode', filter: true },
      { headerName: 'Destination State', field: 'new_destinationstate', filter: true },
      { headerName: 'Shipment Start Date', field: 'new_shipmentsstartdate', filter: true },
      { headerName: 'Origin Prem ID', field: 'new_originpremid', filter: true },
      { headerName: 'Destination Prem ID', field: 'new_destinationpremid', filter: true },
      { headerName: 'Number of Items Moved', field: 'new_numitemsmoved', filter: true },
      // Add more columns based on your Movement model fields
    ] : [
        { headerName: 'ID', field: 'Id', filter: true },
        { headerName: 'Premise Id', field: 'premiseid', filter: true },
        { headerName: 'Total Animal', field: 'total_animal', filter: true },
        { headerName: 'Latitude', field: 'lat', filter: true },
        { headerName: 'Longitude', field: 'long', filter: true },

        // Add more columns based on your Movement model fields
      ],
    [props.tableType]
  );

  
  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
  }), []);

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event: any) => {
    console.log('cellClicked', event);
  }, []);

  // Example load data from server
  useEffect(() => {

    const token = getToken();
    if (!token) {
          navigate('/login')
    }

    fetch(`${config.apiUrl}/${props.tableType}`,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Adjust headers as needed
      },
    })
      .then((result) => result.json())
      .then((rowData) => {
        console.log(rowData[props.tableType])
        setRowData(rowData[props.tableType])
      })
      .catch((err)=>{
        if (err.response && err.response.status === 401) {
          console.log('Unauthorized access. Redirecting to login page...');
          logout()
          navigate('/login')
        } else {
          console.error('Error:', err.message);
          // Handle other types of errors if needed
        }
      });
  }, [props.tableType, navigate]);

  // Example using Grid's API
  const buttonListener = useCallback(() => {
    if (gridRef.current) {
      const api: GridApi = gridRef.current.api;
      api.deselectAll();
    }
  }, []);

  return (
    <div className='wrapper'>
      <Stack direction="horizontal" gap={3}>
      <div className='visualise-wrapper'>
      <Button variant="primary" className="custom-button" onClick={handleVisualiseShow}>
        Visualise
      </Button>
      <Modal show={showVisualise} onHide={handleVisualiseClose}>
        <Modal.Header closeButton>
          <Modal.Title>{titleCase(props.tableType)}</Modal.Title>
        </Modal.Header>
        <Modal.Body><Map rowData={rowData} dataType={props.tableType}/></Modal.Body>
        <Modal.Footer>
          <div>
          <img
            src={greenLocationPin}
            alt="Start Marker"
            style={{ width: '20px', height: '20px' }} // Adjust width and height as needed
          />
          <span>Route Origin</span>
        </div>
        <div>
          <img
            src={redLocationPin}
            alt="End Marker"
            style={{ marginRight: '5px', width: '20px', height: '20px' }} // Adjust width and height as needed
          />
          <span>Route Destination</span>
        </div>
        </Modal.Footer>
      </Modal>
      </div>
      <div className='visualise-wrapper'>
      <Button variant="primary" className="custom-button" onClick={handleFormShow}>
        Create {titleCase(props.tableType)}
      </Button>
      <Modal show={showForm} onHide={handleFormClose}>
        <Modal.Header closeButton>
          <Modal.Title>{titleCase(props.tableType)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.tableType==="movements" ? <MovementForm/>:<PopulationForm/>}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleFormClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      </Stack>
    <div className="ag-theme-material" style={{ width: '100%', height: 500 }}>
        <AgGridReact
          className='table'
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </div>
    </div>
  );
};

export default DataTable;