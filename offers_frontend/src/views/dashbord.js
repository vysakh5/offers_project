import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  Container,
  Form,
  Row,
  Col,
  Table,
  Alert,
} from 'react-bootstrap';
import { postRequest, getRequest, deleteRequest } from '../data/apiCall';
import CONFIG from '../data/config';

export default function Dashbord() {
  const [state, setState] = useState({});
  const [msg, setMsg] = useState('');
  const [banerList, setBanerList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async (searchText) => {
    let response;
    if (searchText) {
      response = await getRequest(
        `offers/get-all-offers?searchText=${searchText}`
      );
    } else {
      response = await getRequest(`offers/get-all-offers`);
    }

    if (response.data.statusCode === 200 && response.data.data) {
      setBanerList(response.data.data);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let response = await postRequest({ data: state, url: 'offers/add-offer' });

    setMsg(response.data.msg);

    getData();
  };

  const onDelete = async (id) => {
    let response = await deleteRequest(`offers/delete-offer?id=${id}`);
    setMsg(response.data.msg);

    getData();
  };

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.type === 'date') {
      setState({ ...state, [e.target.name]: e.target.valueAsNumber });
    } else if (e.target.type === 'file') {
      setState({ ...state, [e.target.name]: e.target.files[0] });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className='m-4'>
      <Alert variant='warning'>&nbsp; {msg} </Alert>
      <Row>
        <Col lg='8' md='12'>
          <div>
            <Card className='p-2'>
              <Row>
                <Col lg='12'>
                  <Form.Group
                    className='mb-3'
                    controlId='formBasicEmail'
                    className='m-2'
                    style={{ width: '95%' }}
                  >
                    <Form.Control
                      type='text'
                      name='searchText'
                      onChange={(e) => getData(e.target.value)}
                      placeholder=' Search'
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Table striped bordered hover>
                <thead>
                  <tr className='bg-dark text-light'>
                    <th>Sl No</th>
                    <th>Title</th>
                    <th>Desktop Image</th>
                    <th>Mobile Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {banerList.map((item, key) => {
                    return (
                      <tr>
                        <td>{key + 1}</td>
                        <td>{item.title}</td>

                        <td>
                          <img
                            src={`${CONFIG.BASE_URL}/${item.desktopImg}`}
                            height='80px'
                          />
                        </td>
                        <td>
                          <img
                            src={`${CONFIG.BASE_URL}/${item.mobImg}`}
                            height='80px'
                          />
                        </td>
                        <td>
                          <Button
                            onClick={() => onDelete(item._id)}
                            variant='light'
                            className='m-1'
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                          <Button variant='light' className='m-1'>
                            <i className='fas fa-pencil-alt'></i>
                          </Button>
                          <Button variant='light' className='m-1'>
                            <i className='fas fa-thumbs-up'></i>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </div>
        </Col>
        <Col lg='4' md='12'>
          <div>
            <Card className='p-2'>
              <Container>
                <Row>
                  {' '}
                  <strong>Create Baner</strong>{' '}
                </Row>
                <Row className='mt-3'>
                  <Col md='12'>
                    <Form.Group className='mb-3'>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type='text'
                        name='title'
                        onChange={handleChange}
                        placeholder='Title'
                      />
                    </Form.Group>
                  </Col>

                  <Col md='12'>
                    <Form.Group className='mb-3'>
                      <Form.Label>Url</Form.Label>
                      <Form.Control
                        type='text'
                        name='url'
                        onChange={handleChange}
                        placeholder='Url'
                      />
                    </Form.Group>
                  </Col>

                  <Col md='12'>
                    <Form.Group className='mb-3'>
                      <Form.Label>From date</Form.Label>
                      <Form.Control
                        type='date'
                        name='fromDate'
                        onChange={handleChange}
                        placeholder='From date'
                      />
                    </Form.Group>
                  </Col>

                  <Col md='12'>
                    <Form.Group className='mb-3'>
                      <Form.Label>To date</Form.Label>
                      <Form.Control
                        type='date'
                        name='toDate'
                        onChange={handleChange}
                        placeholder='To date'
                      />
                    </Form.Group>
                  </Col>

                  <Col md='12'>
                    <Form.Group className='mb-3'>
                      <div>Position</div>
                      <select
                        className='form-select'
                        name='position'
                        style={{ width: '100%', padding: '5px' }}
                        onChange={handleChange}
                      >
                        <option value=''>Select Position</option>
                        <option value='main'>Main Baner</option>
                        <option value='side'>Side Baner</option>
                      </select>
                    </Form.Group>
                  </Col>

                  <Col md='12'>
                    <Form.Group className='mb-3'>
                      <Form.Label>Desktop image</Form.Label>
                      <Form.Control
                        type='file'
                        name='desktopImg'
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md='12'>
                    <Form.Group className='mb-3'>
                      <Form.Label>Moble image</Form.Label>
                      <Form.Control
                        type='file'
                        name='mobImg'
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='d-flex justify-content-center'>
                  <Button onClick={onSubmit} variant='warning'>
                    Create
                  </Button>
                </Row>
              </Container>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}
