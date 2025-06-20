package com.ecommerce.gatewayservice.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;


import com.ecommerce.gatewayservice.entity.*;

import java.util.List;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/api/products")
public class GuestController {
    @GetMapping("/list")
    public ResponseEntity<?> getProductsList() {
        final String uri = "http://localhost:8082/products/productlist";
        RestTemplate restTemplate = new RestTemplate();
        // return restTemplate.getForEntity(uri, Object.class); //not recommended Object
        ResponseEntity<List<ProductCategoryDTO>> response = restTemplate.exchange(uri,HttpMethod.GET,null,new ParameterizedTypeReference<List<ProductCategoryDTO>>() {});

        return response;
    }

    @GetMapping("/category")
    public ResponseEntity<?> getCategoryList() {
        final String uri = "http://localhost:8082/products/categorylist";
        RestTemplate restTemplate = new RestTemplate();
        // return restTemplate.getForEntity(uri, Object.class); //not recommended Object
        ResponseEntity<List<CategoryDTO>> response = restTemplate.exchange(uri,HttpMethod.GET,null,new ParameterizedTypeReference<List<CategoryDTO>>() {});

        return response;
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<?> getProductsListName(@PathVariable String name) {
        final String uri = "http://localhost:8082/products/product/name/"+name;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<ProductCategoryDTO>> response = restTemplate.exchange(uri,HttpMethod.GET,null,new ParameterizedTypeReference<List<ProductCategoryDTO>>() {});

        return response;
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<?> getProductsListCategory(@PathVariable String category) {
        final String uri = "http://localhost:8082/products/product/category/"+category;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<ProductCategoryDTO>> response = restTemplate.exchange(uri,HttpMethod.GET,null,new ParameterizedTypeReference<List<ProductCategoryDTO>>() {});

        return response;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> fetchProductById(@PathVariable("id") Long id)
    {
        final String uri = "http://localhost:8082/products/product/"+id;
        RestTemplate restTemplate = new RestTemplate();
        try{
            return restTemplate.getForEntity(uri, ProductDTO.class);
        } catch (HttpClientErrorException | HttpServerErrorException ex) {
            // Handle error response as String
            String errorBody = ex.getResponseBodyAsString();
            HttpStatusCode statusCode = ex.getStatusCode();

            return ResponseEntity.status(statusCode).body(errorBody);
        } catch (Exception ex) {
            // Catch all other unexpected errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error: " + ex.getMessage());
        }
    }
 
}