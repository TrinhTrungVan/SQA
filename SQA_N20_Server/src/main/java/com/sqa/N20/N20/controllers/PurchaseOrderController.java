package com.sqa.N20.N20.controllers;

import com.sqa.N20.N20.models.OrderItem;
import com.sqa.N20.N20.models.Product;
import com.sqa.N20.N20.models.PurchaseOrder;
import com.sqa.N20.N20.models.ResponseObject;
import com.sqa.N20.N20.repositories.ProductRepository;
import com.sqa.N20.N20.repositories.PurchaseOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping(path = "/api/purchase-orders")
public class PurchaseOrderController {
    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("")
    List<PurchaseOrder> getAllPurchaseOrders() {
        return purchaseOrderRepository.findAll(); // Get all Products
    }

    @GetMapping("/{id}")
    ResponseEntity<ResponseObject> getPurchaseOrderById(@PathVariable Long id) {
        Optional<PurchaseOrder> foundPurchaseOrder = purchaseOrderRepository.findById(id);
        return foundPurchaseOrder != null ?
                ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("OK", "Query PurchaseOrder successfully", foundPurchaseOrder)
                ) :
                ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("Failed", "Cannot find PurchaseOrder with id = " + id, "")
                );
    }

    @PostMapping("/create")
    ResponseEntity<ResponseObject> createProduct(@RequestBody PurchaseOrder newPurchaseOrder) {
        PurchaseOrder foundPurchaseOrder = purchaseOrderRepository.findByPurchaseCode(newPurchaseOrder.getPurchaseCode().trim());
        if(foundPurchaseOrder != null){
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("Failed", "PurchaseCode đã tồn tại!", "")
            );
        }

        int totalPrice = 0;
        for(OrderItem item : newPurchaseOrder.getOrderItems()){
            item.setPurchaseOrder(newPurchaseOrder);
            Product foundProduct = productRepository.findById(item.getProduct().getId()).get();
            item.setUnitPrice(foundProduct.getPrice());
            totalPrice += item.getQuantity() * foundProduct.getPrice();
            newPurchaseOrder.setTotalPrice(totalPrice);
            newPurchaseOrder.setCreatedDate(LocalDateTime.now());
        }

        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Create product successfully", purchaseOrderRepository.save(newPurchaseOrder))
        );
    }
}
