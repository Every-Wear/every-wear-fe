import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  margin-top: 20vh;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Message = styled.p`
  font-size: 18px;
`;

const NotFoundPage = () => (
  <Container>
    <Title>404 - Page Not Found</Title>
    <Message>The page you are looking for does not exist.</Message>
  </Container>
);

export default NotFoundPage;
