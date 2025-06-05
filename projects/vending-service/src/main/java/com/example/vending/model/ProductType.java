package com.example.vending.model;

public enum ProductType {
    SPARKLING_WATER(25),
    SPARK_PASTA(35),
    SPARK_SODA(45);

    private final int price;

    ProductType(int price) {
        this.price = price;
    }

    public int getPrice() {
        return price;
    }
}
