import styled from "styled-components";

export const Loading = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
`

export const LoadingError = styled(Loading)`
color: red;
font-size: 20px;
`

export const Failed = styled.span(LoadingError)