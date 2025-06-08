package com.myspace.tdd.controller;

import com.myspace.tdd.controller.service.InventoryService;
import com.myspace.tdd.model.Product;
import com.myspace.tdd.model.ProductType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class InventoryControllerTest {

    @InjectMocks
    private InventoryController inventoryController;

    @MockitoBean
    private InventoryService inventoryService;

    private ProductType productType;

    @BeforeEach
    void setup(){
        productType = ProductType.SPARKLING_WATER;
    }

    @Test
    void insertProducts_shouldReturnOk() throws Exception {
        Product mockedProduct = new Product(ProductType.SPARKLING_WATER, 2);
        when(inventoryService.addProductToInventory(any())).thenReturn(mockedProduct);
        mockMvc.perform(post("/inventory/products"))
                .andExpect(status().isOk())
                .andExpect(content().string("Added Product SPARKLING_WATER to Inventory. Total Count is 2"));
        verify(inventoryService).addProductToInventory(ProductType.SPARKLING_WATER);



        ProductType mockType = ProductType.ELECTRONICS; // use your enum or class here
        Product mockProduct = new Product();
        mockProduct.setProductType(mockType);
        mockProduct.setCount(5);

        when(inventoryService.addProductToInventory(mockType)).thenReturn(mockProduct);

        // Act
        ResponseEntity<String> response = inventoryController.insertProducts(mockType);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().contains("Added Product ELECTRONICS"));
        assertTrue(response.getBody().contains("Total Count is 5"));


    }

}
