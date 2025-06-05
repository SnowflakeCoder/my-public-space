package com.example.vending.controller;

import com.example.vending.service.ProductInventoryService;
import com.example.vending.model.Product;
import com.example.vending.model.ProductType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(VendingController.class)
@AutoConfigureMockMvc
class VendingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProductInventoryService productInventoryService;

    @Test
    void insertProducts_shouldReturnOk() throws Exception {

        Product mockedProduct = new Product(ProductType.SPARK_PASTA, 1);
        when(productInventoryService.addToInventory(any())).thenReturn(mockedProduct);

        mockMvc.perform(post("/vending/products"))
                .andExpect(status().isOk())
                .andExpect(content().string("Total SPARK_PASTA Products Added Successfully is 1."));
    }


}
