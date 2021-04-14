import ReactDOM from 'react-dom';

export const Portal = ({ targetId, children }) => {
  const portal = document.getElementById(targetId);
  if (!portal) return null;
  return ReactDOM.createPortal(children, portal);
};
