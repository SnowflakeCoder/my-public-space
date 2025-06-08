package com.myspace.tdd.controller.service;

import com.myspace.tdd.model.Product;
import com.myspace.tdd.model.ProductType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InventoryService {

    public Product addProductToInventory(ProductType productType){
        return new Product(productType, 0);
    }

}
