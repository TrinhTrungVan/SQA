package com.sqa.N20.N20.repositories;

import com.sqa.N20.N20.models.Product;
import com.sqa.N20.N20.models.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    Supplier findBySupplierCode(String supplierCode);

    List<Supplier> findBySupplierNameContaining(String name);
}
