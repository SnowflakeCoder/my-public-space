package com.example.vending.model;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class ProductTest {

    @Test
    void shouldIncrementCountByOne() {
        Product product = new Product(ProductType.SPARKLING_WATER, 2);

        product.incrementCount();

        assertThat(product.getCount()).isEqualTo(3);
    }
}