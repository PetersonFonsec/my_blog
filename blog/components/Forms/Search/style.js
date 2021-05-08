import styled from "styled-components";
import Button from "../../Button/index";

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 32px;
`;

export const ButtonSubmit = styled(Button)`
  width: 100%;
  position: relative;

  @media (min-width: 768px) {
    width: 96px;
  }

  span {
    @media (min-width: 768px) {
      display: none;
    }
  }

  img {
    filter: invert(1);
    width: 24px;
    position: absolute;
    left: 17px;
    top: 50%;
    transform: translateY(-50%);

    @media (min-width: 768px) {
      left: 0;
      right: 0;
      margin: auto;
    }
  }
`;

export const Input = styled.input`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  border: none;
  padding: 14px 12px;
  margin-bottom: 16px;
  outline: none;
  appearance: none;

  @media (min-width: 768px) {
    padding: 20px 24px;
    margin-bottom: 0;
    margin-right: 24px;
    flex: 1;
  }

  &,
  &::placeholder {
    color: #acb2bf;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;

    @media (min-width: 768px) {
      font-size: 24px;
      line-height: 29px;
    }
  }
`;
