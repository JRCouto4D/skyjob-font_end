import React from 'react';

import { Container } from './styles';
import noImage from '../../../../../assets/notImage.png';

function ImageInput() {
  return (
    <Container>
      <label htmlFor="avatar">
        <img src={noImage} alt="" />

        <input type="file" id="avatar" accept="image/*" />
      </label>
    </Container>
  );
}

export default ImageInput;
