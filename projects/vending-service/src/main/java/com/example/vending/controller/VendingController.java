package com.example.vending.controller;

import com.example.vending.service.ProductInventoryService;
import com.example.vending.model.Product;
import com.example.vending.model.ProductType;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/vending")
public class VendingController {

    private final ProductInventoryService productInventoryService;

    @PostMapping("products")
    public ResponseEntity<String> addProducts(ProductType productType){
        Product addedProduct = productInventoryService.addToInventory(productType);
        return ResponseEntity.ok(String.format("Total %s Products Added Successfully is %d.", addedProduct.getProductType(), addedProduct.getCount()));
    }

}
