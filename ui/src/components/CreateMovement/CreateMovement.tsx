import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import config from '../../config';
import './CreateMovement.scss'

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
    fetch(`${config.apiUrl}/movements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Assuming the response is in JSON format
      })
      .then(data => {
        console.log('Data sent successfully:', data);
        // Handle any success actions here
      })
      .catch(error => {
        console.error('Failed to send data. Error:', error);
        // Handle any error actions here
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => (
        <Form.Group key={field} controlId={field}>
          <Form.Label>{field.replace(/_/g, ' ').toUpperCase()}</Form.Label>
          <Form.Control type="text" {...register(field)} />
        </Form.Group>
      ))}

      <Button variant="primary" type="submit" className="custom-button">
        Submit
      </Button>
    </Form>
  );
};

export default MovementForm