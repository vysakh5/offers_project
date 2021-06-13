import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { getRequest } from '../data/apiCall';
import CONFIG from '../data/config';

export default function Home() {
  const [banerList, setBanerList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async (e) => {
    let response = await getRequest('offers/get-all-offers');
    if (response.data.statusCode === 200) {
      setBanerList(response.data.data);
    }
  };

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  console.log('💢🔥', isTabletOrMobile);

  if (isTabletOrMobile) {
    return (
      <div className='home'>
        <div className='title-offer'></div>
        <Row className='m-5'>
          <Col md='12'>
            {banerList.map((item, key) => {
              return (
                <Link to={{ pathname: `http://${item.url}` }} target='_blank'>
                  <Row>
                    <img
                      src={`${CONFIG.BASE_URL}/${item.mobImg}`}
                      width='100%'
                      className='img-box'
                      alt={item.title}
                    />
                  </Row>
                </Link>
              );
            })}
          </Col>
        </Row>
      </div>
    );
  } else {
    return (
      <div className='home'>
        <div className='title-offer'></div>
        <Row className='m-5'>
          <Col lg='8' md='12'>
            {banerList.map((item, key) => {
              if (item.position === 'main') {
                return (
                  <Link to={{ pathname: `http://${item.url}` }} target='_blank'>
                    <Row>
                      <img
                        src={`${CONFIG.BASE_URL}/${item.desktopImg}`}
                        width='100%'
                        className='img-box'
                        alt={item.title}
                      />
                    </Row>
                  </Link>
                );
              }
            })}
          </Col>
          <Col lg='4' md='4'>
            {banerList.map((item, key) => {
              if (item.position === 'side') {
                return (
                  <Row>
                    <Link
                      to={{ pathname: `http://${item.url}` }}
                      target='_blank'
                    >
                      <img
                        src={`${CONFIG.BASE_URL}/${item.desktopImg}`}
                        width='100%'
                        className='img-box'
                      />
                    </Link>
                  </Row>
                );
              }
            })}
          </Col>
        </Row>
      </div>
    );
  }
}
