import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { GridApi, ColumnApi } from 'ag-grid-community'; // Grid and Column API types
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS


interface DataTableProps {
    tableType: string;
  }


const DataTable: React.FC<DataTableProps> = (props) => {
  const gridRef = useRef<AgGridReact>(null); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState<any[]>(); // Set rowData to Array of Objects, one Object per Row

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
      { headerName: 'Origin Latitude', field: 'origin_Lat', filter: true },
      { headerName: 'Origin Longitude', field: 'origin_Lon', filter: true },
      { headerName: 'Destination Latitude', field: 'destination_Lat', filter: true },
      { headerName: 'Destination Longitude', field: 'destination_Long', filter: true },
      { headerName: 'Shipment Start Date', field: 'new_shipmentsstartdate', filter: true },
      { headerName: 'Origin Prem ID', field: 'new_originpremid', filter: true },
      { headerName: 'Destination Prem ID', field: 'new_destinationpremid', filter: true },
      { headerName: 'Number of Items Moved', field: 'new_numitemsmoved', filter: true },
      // Add more columns based on your Movement model fields
    ] : [
        { headerName: 'ID', field: 'Id', filter: true },
        { headerName: 'Premise Id', field: 'premiseid', filter: true },
        { headerName: 'Total Animal', field: 'total_animal', filter: true },

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
    fetch(`http://127.0.0.1:5000/${props.tableType}`)
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData[props.tableType]));
  }, [props.tableType]);

  // Example using Grid's API
  const buttonListener = useCallback(() => {
    if (gridRef.current) {
      const api: GridApi = gridRef.current.api;
      api.deselectAll();
    }
  }, []);

  return (
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
  );
};

export default DataTable;