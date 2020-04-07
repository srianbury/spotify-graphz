import withReactSizes from 'react-sizes';

const mapSizesToProps = ({ width }) => ({
  width,
});
const withSizes = withReactSizes(mapSizesToProps);

export default withSizes;
