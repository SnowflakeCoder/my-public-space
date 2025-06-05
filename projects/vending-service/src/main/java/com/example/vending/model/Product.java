package com.example.vending.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
