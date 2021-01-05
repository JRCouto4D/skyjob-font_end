/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import { useField } from '@rocketseat/unform';
import { FaSpinner } from 'react-icons/fa';

import api from '../../../../../services/api';

import { Container, Loading } from './styles';

function ImageInput() {
  const { defaultValue, registerField } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const [loading, setLoading] = useState(false);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  async function handleChange(e) {
    setLoading(true);
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
    setLoading(false);
  }

  return (
    <Container>
      <label htmlFor="image">
        {loading ? (
          <Loading>
            <FaSpinner color="#ccc" size={18} />
          </Loading>
        ) : preview ? (
          <img src={preview} alt="" />
        ) : (
          <div className="label-logo">
            <strong>FOTO</strong>
          </div>
        )}

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
