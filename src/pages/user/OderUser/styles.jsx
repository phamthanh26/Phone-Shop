import styled from 'styled-components';

export const TitleAddress = styled.div`
  display: flex;
  justify-content:space-between;
`;

export const MainOrders = styled.div`
  margin-top: 16px;
  & .ant-table-thead > tr > th{
    font-weight: bold!important;
  }
`;

export const CustomText = styled.div`
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

`;