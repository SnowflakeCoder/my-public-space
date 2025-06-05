package com.example.vending.repository;

import com.example.vending.model.Product;
import com.example.vending.model.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByProductType(ProductType productType);
}