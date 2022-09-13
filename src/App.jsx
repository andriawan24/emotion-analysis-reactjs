/* eslint-disable no-alert */
/* eslint-disable no-console */
import {
  Button, Container, Heading, Image, Input,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './config/api';

function App() {
  document.title = 'Home Page | Emotion Analysis';
  const [imageURL, setImageURL] = useState(null);
  const [preview, setPreview] = useState();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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
    setImageURL(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!isAnalyzing) {
      if (!imageURL) {
        alert('Please enter image first');
        return;
      }

      setIsAnalyzing(true);

      const formData = new FormData();
      formData.append('file', imageURL);

      api.post('/process-image', formData).then((response) => {
        console.log(response.data.data);
        localStorage.setItem('result', JSON.stringify(response.data.data));
        setIsAnalyzing(false);
        navigator('/result');
      }).catch((error) => {
        console.log(error.message);
        setIsAnalyzing(false);
      });
    }
  };

  return (
    <Container maxW="container.lg" py={20}>
      <Heading fontSize="xl">Pilih gambar terlebih dahulu</Heading>
      {imageURL && <Image mt={6} src={preview} alt="chosen" h={300} fit="cover" mx="auto" />}
      <Input type="file" onChange={handleFileChange} accept="image/*" mt={10} />
      <Button w="full" mt={10} onClick={handleSubmit} isActive={!isAnalyzing}>
        {isAnalyzing ? 'Analyzing...' : 'Analyze'}
      </Button>
    </Container>
  );
}

export default App;
