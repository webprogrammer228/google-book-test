import styled, { keyframes } from "styled-components";

const Loader = () => {
  return <LoaderBlock />;
};

export default Loader;

const loader = keyframes`{
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}`;

const LoaderBlock = styled.div`
  display: inline-block;
  width: 5em;
  height: 5em;
  color: inherit;
  vertical-align: middle;
  pointer-events: none;

  border: 1em solid transparent;
  border-left-color: lightblue;
  border-right-color: lightblue;
  border-radius: 50%;
  animation: 1s loader-02 linear infinite;

  border: 1em dotted lightblue;
  border-radius: 50%;
  animation: 1s ${loader} linear infinite;
`;
