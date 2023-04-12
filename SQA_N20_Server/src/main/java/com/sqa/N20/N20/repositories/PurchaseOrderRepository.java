package com.sqa.N20.N20.repositories;

import com.sqa.N20.N20.models.Product;
import com.sqa.N20.N20.models.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {
    PurchaseOrder findByPurchaseCode(String code);
}
