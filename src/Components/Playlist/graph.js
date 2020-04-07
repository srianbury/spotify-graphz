import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import DefaultLegendContent from 'recharts/lib/component/DefaultLegendContent';
import { COLORS } from '../../Constants';
import withSize from '../Size';

const GraphContainer = ({ width, items, filter, setFilter }) => {
  return (
    <GraphView
      data={formatData(items)}
      setFilter={setFilter}
      filter={filter}
      height={Math.min(width * 1.5, 500)}
    />
  );
};

const GraphView = ({ data, filter, setFilter, height }) => (
  <ResponsiveContainer width="100%" height={height}>
    <PieChart>
      <Pie
        data={data}
        dataKey="frequency"
        nameKey="artist"
        cx="50%"
        cy="50%"
      >
        {data.map((item, index) => (
          <Cell
            key={item.artist}
            fill={COLORS[index % COLORS.length]}
            onClick={() => setFilter(item.artist)}
            stroke={filter === item.artist ? '#000000' : null}
          />
        ))}
      </Pie>
      <Tooltip />
      <Legend
        content={<ScrollableLegend />}
        verticalAlign="bottom"
        formatter={(value, entry) => (
          <span
            className={filter === value ? 'font-weight-bold' : ''}
          >{`${value}: ${entry.payload.value}`}</span>
        )}
        onClick={(event) => setFilter(event.value)}
      />
    </PieChart>
  </ResponsiveContainer>
);

const ScrollableLegend = (props) => {
  const newProps = { ...props };
  return (
    <Scrollbars autoHeight autoHeightMax={200}>
      <DefaultLegendContent {...newProps} />
    </Scrollbars>
  );
};

function formatData(items) {
  const result = [];
  const dict = {};
  items.forEach((item) => {
    item.track.artists.forEach((artist) => {
      if (artist.name in dict) {
        dict[artist.name] += 1;
      } else {
        dict[artist.name] = 1;
      }
    });
  });
  for (let [artist, frequency] of Object.entries(dict)) {
    result.push({
      artist,
      frequency,
    });
  }
  return result;
}

export default withSize(GraphContainer);
