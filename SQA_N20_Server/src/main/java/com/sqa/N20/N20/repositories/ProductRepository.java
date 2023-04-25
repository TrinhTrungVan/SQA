package com.sqa.N20.N20.repositories;

import com.sqa.N20.N20.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findByProductCode(String productCode);
    List<Product> findByProductNameContaining(String name);
    List<Product> findByProductCodeContaining(String productCode);
}
