const Image = (props) => {
  const imageSrc = require(props.src);
  return (<img src={imageSrc} {... props} />);
};

export default Image;