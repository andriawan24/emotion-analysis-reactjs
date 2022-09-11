/* eslint-disable no-console */
import {
  Button, Container, Heading, Image, Input,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  document.title = 'Home Page | Emotion Analysis';
  const [imageURL, setImageURL] = useState();
  const [preview, setPreview] = useState();

  const navigator = useNavigate();

  useEffect(() => {
    if (!imageURL) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(imageURL);
    setPreview(objectUrl);
  }, [imageURL]);

  const handleFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImageURL(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setImageURL(e.target.files[0]);
  };

  const handleSubmit = () => {
    navigator('/result');
  };

  return (
    <Container maxW="container.lg" py={20}>
      <Heading fontSize="xl">Pilih gambar terlebih dahulu</Heading>
      {imageURL && <Image mt={6} src={preview} alt="chosen" h={300} fit="cover" mx="auto" />}
      <Input type="file" onChange={handleFileChange} accept="image/*" mt={10} />
      <Button w="full" mt={10} onClick={handleSubmit}>
        Analyze
      </Button>
    </Container>
  );
}

export default App;
