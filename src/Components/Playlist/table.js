import React from 'react';
import withSizes from '../Size';
import { Container, Row, Col } from 'react-bootstrap';
import AudioPlayer from '../AudioPlayer';
import { SIZES } from '../../Constants';

const TableContainer = ({ width, ...rest }) => {
  if (width <= SIZES.SMALL) {
    return <SmallTable {...rest} />;
  }

  if (width <= SIZES.MEDIUM) {
    return <GridView {...rest} />;
  }

  return <TableView {...rest} />;
};

const tdStyles = {
  style: {
    verticalAlign: 'middle',
  },
};

const TableView = ({ items }) => (
  <table className="table table-striped">
    <thead>
      <tr>
        <th></th>
        <th></th>
        <th>Song</th>
        <th>Artist</th>
        <th>Album</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item) => (
        <tr key={item.track.id}>
          <td>
            <img
              src={item.track.album.images[0].url}
              alt="album cover"
              className="img-fluid"
              style={{ maxHeight: 50, maxWidth: 50 }}
            />
          </td>
          <td {...tdStyles}>
            <AudioPlayer src={item.track.preview_url} />
          </td>
          <td {...tdStyles}>{item.track.name}</td>
          <td {...tdStyles}>
            {item.track.artists
              .map((artist) => artist.name)
              .join(', ')}
          </td>
          <td {...tdStyles}>{item.track.album.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const GridView = ({ items }) => (
  <Container>
    <Row>
      {items.map((item) => (
        <Col sm={6} key={item.track.id}>
          <div className="card m-1">
            <img
              className="card-img-top img-fluid"
              src={item.track.album.images[0].url}
              alt={item.track.name}
            />
            <div className="card-body">
              <div>{item.track.name}</div>
              <div>
                {item.track.artists
                  .map((artist) => artist.name)
                  .join(', ')}
              </div>
              <div>{item.track.album.name}</div>
              <AudioPlayer src={item.track.preview_url} />
            </div>
          </div>
        </Col>
      ))}
    </Row>
  </Container>
);

const SmallTable = ({ items }) => (
  <Container>
    {items.map((item, index) => (
      <Row
        key={item.track.id}
        className="mt-1 mb-1 pt-2 pb-2"
        {...getStripe(index)}
      >
        <div {...getStripe(index)} className="col-2 media">
          <img
            src={item.track.album.images[0].url}
            alt="album cover"
            className="img-fluid d-flex align-self-center"
            style={{ maxHeight: 50, maxWidth: 50 }}
          />
        </div>
        <div className="col-2">
          <AudioPlayer src={item.track.preview_url} />
        </div>
        <div className="col-8">
          <div>{item.track.name}</div>
          <div style={{ fontSize: 12 }}>
            {`${item.track.artists
              .map((artist) => artist.name)
              .join(', ')} . ${item.track.album.name}`}
          </div>
        </div>
      </Row>
    ))}
  </Container>
);

function getStripe(index) {
  return {
    style: {
      backgroundColor: index % 2 === 0 ? '#d3d3d3' : '#ffffff',
    },
  };
}

export default withSizes(TableContainer);
