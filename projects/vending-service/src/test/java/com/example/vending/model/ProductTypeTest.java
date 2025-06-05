package com.example.vending.model;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class ProductTypeTest {

    @Test
    void shouldReturnCorrectPriceForEachProductType() {
        assertThat(ProductType.SPARKLING_WATER.getPrice()).isEqualTo(25);
        assertThat(ProductType.SPARK_PASTA.getPrice()).isEqualTo(35);
        assertThat(ProductType.SPARK_SODA.getPrice()).isEqualTo(45);
    }

}