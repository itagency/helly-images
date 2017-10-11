import React from 'react';

import './hhimage.css';

const HHImage = ({ index, onClick, photo, margin }) => {
  return (
    <div className="hhimage">
      <img {...photo} onClick={(e) => onClick(e, {index, photo})} alt="" />
    </div>
  );
}

export default HHImage;
