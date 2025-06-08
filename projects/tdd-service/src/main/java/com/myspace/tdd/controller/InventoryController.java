package com.myspace.tdd.controller;

import com.myspace.tdd.controller.service.InventoryService;
import com.myspace.tdd.model.Product;
import com.myspace.tdd.model.ProductType;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @PostMapping("products")
    public ResponseEntity<String> insertProducts(ProductType productType) {
        Product product = inventoryService.addProductToInventory(productType);
        return ResponseEntity.ok(String.format("Added Product %s to Inventory. Total Count is %d", product.getProductType(), product.getCount()));
    }
}
