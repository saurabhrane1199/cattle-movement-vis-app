import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const PopulationForm = () => {
  const { register, handleSubmit } = useForm();

  const fields = [
    'premiseid',
    'total_animal',
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

export default PopulationForm;