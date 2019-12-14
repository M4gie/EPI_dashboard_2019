import styled from 'styled-components';

export const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: 10,
    minWidth: 400,
    maxWidth: 500,
    maxHeight: 500,
    overflowY: 'auto'
  }
};

export const CircleBackground = styled.div`
  width: 100%;
  height: 65px;
  background-color: #6787FC;
  border-radius: 50%;
  transition: 0.2s ease;
  background-image: url("${props => props.image}");
  background-size: contain;
  cursor: pointer;
  margin-top: 10px;
  ${props => props.additionalcss}
  &:hover {
    transition: 0.2s ease;
    filter: brightness(80%);
    border-radius: 30%;
  };
`;
