package com.myspace.tdd.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public class Product {

    private Long id;

    @Getter
    private ProductType productType;

    @Getter
    private int count;

    public Product(ProductType productType, int count) {
        this.productType = productType;
        this.count = count;
    }

    public void incrementCount() {
        count++;
    }
}
