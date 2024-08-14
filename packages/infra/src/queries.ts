import { gql } from "apollo-server";

export const GET_PRODUCTs = gql`{
    query GetProducts {
        Products{
            name
        }  
    }
}`;

export const CREATE_PRODUCT = gql`{
    mutation CerateProduct($input: CreateProductInput){
        createProduct($input: $input){
            name
        }
    }
}`;
