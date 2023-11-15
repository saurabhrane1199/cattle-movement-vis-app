import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const MovementForm = () => {
  const { register, handleSubmit } = useForm();

  const fields = [
    'account_company',
    'new_movementreason',
    'new_species',
    'new_originaddress',
    'new_origincity',
    'new_originname',
    'new_originpostalcode',
    'new_originstate',
    'new_destinationaddress',
    'new_destinationcity',
    'new_destinationname',
    'new_destinationpostalcode',
    'new_destinationstate',
    'origin_Lat',
    'origin_Lon',
    'destination_Lat',
    'destination_Long',
    'new_shipmentsstartdate',
    'new_originpremid',
    'new_destinationpremid',
    'new_numitemsmoved',
  ];

  const onSubmit = (data: any) => {
    // Handle form submission, send data to the backend, etc.
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => (
        <Form.Group key={field} controlId={field}>
          <Form.Label>{field.replace(/_/g, ' ').toUpperCase()}</Form.Label>
          <Form.Control type="text" {...register(field)} />
        </Form.Group>
      ))}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default MovementForm