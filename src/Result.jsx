import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Container, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Result() {
  document.title = 'Result | Emotion Analysis';
  const navigate = useNavigate();

  const [result, setResult] = useState([]);

  const handleBackButton = () => {
    navigate(-1);
  };

  useEffect(() => {
    setResult(JSON.parse(localStorage.getItem('result')));
  }, []);

  return (
    <Container maxW="container.lg" py={20}>
      <Flex alignItems="center">
        <ArrowBackIcon fontWeight="bold" fontSize="xl" mr={4} onClick={handleBackButton} _hover={{ cursor: 'pointer' }} />
        {' '}
        <Heading fontSize="xl">Hasil Analisis</Heading>
      </Flex>
      <TableContainer mt={10}>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Nomor</Th>
              <Th>Nama Anak</Th>
              <Th>Emosi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {result.map((res, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <Tr key={idx}>
                <Td>{idx + 1}</Td>
                <Td>{res.student_id}</Td>
                <Td>{res.expression}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Result;
