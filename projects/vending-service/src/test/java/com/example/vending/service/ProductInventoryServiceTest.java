package com.example.vending.service;


import com.example.vending.model.Product;
import com.example.vending.model.ProductType;
import com.example.vending.repository.ProductRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ProductInventoryServiceTest {
    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductInventoryService productInventoryService;

    private ProductType productType;

    @BeforeEach
    void setUp() {
        productType = ProductType.SPARKLING_WATER;
    }

    @Test
    void shouldAddNewProductToInventoryWhenNotExists() {
        // given
        when(productRepository.findByProductType(productType)).thenReturn(Optional.empty());
        when(productRepository.save(any(Product.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // when
        Product result = productInventoryService.addToInventory(productType);

        // then
        assertThat(result.getProductType()).isEqualTo(productType);
        assertThat(result.getCount()).isEqualTo(1);

        verify(productRepository).findByProductType(productType);
        verify(productRepository).findByProductType(productType);
    }

    @Test
    void shouldIncrementExistingProductCount() {
        // given
        Product existingProduct = new Product(productType, 2);
        when(productRepository.findByProductType(productType)).thenReturn(Optional.of(existingProduct));
        when(productRepository.save(existingProduct)).thenAnswer(invocation -> invocation.getArgument(0));

        // when
        Product result = productInventoryService.addToInventory(productType);

        // then
        assertThat(result.getCount()).isEqualTo(3);
        verify(productRepository).save(existingProduct);
    }
}