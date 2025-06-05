package com.example.vending.service;

import com.example.vending.model.Product;
import com.example.vending.model.ProductType;
import com.example.vending.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductInventoryService {

    private final ProductRepository productRepository;

    public Product addToInventory(ProductType productType){
        Product currentProduct = productRepository.findByProductType(productType)
                        .orElse(new Product(productType, 0));

        currentProduct.incrementCount();
        return productRepository.save(currentProduct);
    }

}
