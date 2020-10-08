import React, { useState, useEffect, useRef } from 'react';
import { useField } from '@rocketseat/unform';

import api from '../../../../../services/api';

import { Container } from './styles';
import noImage from '../../../../../assets/notImage.png';

function ImageInput() {
  const { defaultValue, registerField } = useField('image');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'image_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="image">
        <img src={preview || noImage} alt="" />

        <input
          type="file"
          id="image"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}

export default ImageInput;
