package com.sqa.N20.N20.controllers;


import com.sqa.N20.N20.models.Product;
import com.sqa.N20.N20.models.ResponseObject;
import com.sqa.N20.N20.models.Supplier;
import com.sqa.N20.N20.repositories.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping(path = "/api/suppliers")
public class SupplierController {
    @Autowired
    private SupplierRepository repository; // Đối tượng sẽ được tạo ra 1 lần ngay sau khi app được tạo

    @GetMapping("")
    List<Supplier> getAllSuppliers() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    ResponseEntity<ResponseObject> getProductById(@PathVariable Long id){
        Supplier foundSupplier = repository.findById(id).orElse(null);
        return foundSupplier != null ?
                ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("OK", "Query nhà cung cấp thành công", foundSupplier)
                ):
                ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("Failed", "Không thể tìm thấy nhà cung cấp với id = " + id, "")
                );
    }

    @PostMapping("/create")
    ResponseEntity<ResponseObject> createProduct(@RequestBody Supplier newSupplier){
        Supplier foundSupplier = repository.findBySupplierCode(newSupplier.getSupplierCode().trim());
        if(foundSupplier != null){
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("Failed", "SupplierCode đã tồn tại", "")
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Add supplier successfully", repository.save(newSupplier))
        );
    }

    @PutMapping("/{id}")
    ResponseEntity<ResponseObject> updateSupplier(@RequestBody Supplier newSupplier, @PathVariable Long id) {
        Supplier foundSupplier = repository.findById(id).orElse(null);
        if (foundSupplier == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("Failed", "Nhà cung cấp không tồn tại!", "")
            );
        }

        Supplier foundSupplierByCode = repository.findBySupplierCode(newSupplier.getSupplierCode().trim());
        if (foundSupplierByCode != null && !foundSupplier.getSupplierCode().equals(newSupplier.getSupplierCode())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("Failed", "SupplierCode đã tồn tại!", "")
            );
        }
        foundSupplier.setSupplierCode(newSupplier.getSupplierCode());
        foundSupplier.setSupplierName(newSupplier.getSupplierName());
        foundSupplier.setAddress(newSupplier.getAddress());
        foundSupplier.setPhone(newSupplier.getPhone());

        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Cập nhật thông tin nhà cung cấp thành công!", repository.save(foundSupplier))
        );
    }

    @DeleteMapping("/{id}")
    ResponseEntity<ResponseObject> deleteSupplier(@PathVariable Long id) {
        try{
            Supplier foundSupplier = repository.findById(id).orElse(null);
            if (foundSupplier == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("Failed", "Nhà cung cấp không tồn tại!", "")
                );
            }
            repository.deleteById(foundSupplier.getId());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Xoá nhà cung cấp thành công!", "")
            );
        }
        catch(Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("Failed", "Đã xảy ra lỗi, không thể xoá nhà cung cấp!", "")
            );
        }
    }

    @GetMapping("/search")
    public List<Supplier> searchSuppliers(@RequestParam String name) {
        return repository.findBySupplierNameContaining(name);
    }
}
