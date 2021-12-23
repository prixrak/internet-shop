import React from 'react';
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import bigStar from '../assets/bigStar.png'

const DevicePage = () => {
  const device = {id: 1, name: 'Ipone 12 PRO', price: 25000, rating: 5, img: 'https://www.meme-arsenal.com/memes/74da4266f0b98a04fa1e9ec32dac5016.jpg'};
  const description = [
    {id: 1, title: 'Оперативна пам\'ять', description: '5 гб'},
    {id: 2, title: 'Ядер процесора', description: '4'},
    {id: 3, title: 'Відеокарта', description: 'NVIDIA'}
  ]
  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={device.img} />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64 }}
            >
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}
          >
            <h3>Від: {device.price} грн.</h3>
            <Button variant={"outline-dark"}>Додати у кошик</Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {description.map((info, index) =>
          <Row key={info.id} style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
            {info.title}: {info.description}
          </Row>
        )}
      </Row>
    </Container>
  );
};

export default DevicePage;