import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import config from '../../config';
import './PopulationForm.scss'
const PopulationForm = () => {
  const { register, handleSubmit } = useForm();

  const fields = [
    'premiseid',
    'total_animal',
  ];

  const onSubmit = (data: any) => {
    // Handle form submission, send data to the backend, etc.
    // Handle form submission, send data to the backend, etc.
    fetch(`${config.apiUrl}/population`, {
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

export default PopulationForm;