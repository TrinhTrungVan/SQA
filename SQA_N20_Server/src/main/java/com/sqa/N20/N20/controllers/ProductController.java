package com.sqa.N20.N20.controllers;

import com.sqa.N20.N20.models.Product;
import com.sqa.N20.N20.models.ResponseObject;
import com.sqa.N20.N20.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping(path = "/api/products")
public class ProductController {

    @Autowired
    private ProductRepository repository; // Đối tượng sẽ được tạo ra 1 lần ngay sau khi app được tạo

    @GetMapping("")
    List<Product> getAllProducts() {
        return repository.findAll(); // Get all Products
    }

    @GetMapping("/{id}")
    ResponseEntity<ResponseObject> getProductById(@PathVariable Long id) {
        Optional<Product> foundProduct = repository.findById(id);
        return foundProduct != null ?
                ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("OK", "Query thành công!", foundProduct)
                ) :
                ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("Failed", "Không tìm thấy sản phẩm với id = " + id, "")
                );
    }

    @PostMapping("/create")
    ResponseEntity<ResponseObject> createProduct(@RequestBody Product newProduct) {
        Product foundProducts = repository.findByProductCode(newProduct.getProductCode().trim());
        if (foundProducts != null) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("Failed", "ProductCode đã tồn tại!", "")
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Thêm sản phẩm thành công!", repository.save(newProduct))
        );
    }

    @PutMapping("/{id}")
    ResponseEntity<ResponseObject> updateProduct(@RequestBody Product newProduct, @PathVariable Long id) {
        Product foundProducts = repository.findById(id).orElse(null);
        if (foundProducts == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("Failed", "Sản phẩm không tồn tại!", "")
            );
        }

        Product foundProductsByCode = repository.findByProductCode(newProduct.getProductCode().trim());
        if (foundProductsByCode != null && !foundProducts.getProductCode().equals(newProduct.getProductCode())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("Failed", "ProductCode đã tồn tại!", "")
            );
        }
        foundProducts.setProductCode(newProduct.getProductCode());
        foundProducts.setProductName(newProduct.getProductName());
        foundProducts.setAuthor(newProduct.getAuthor());
        foundProducts.setCategory(newProduct.getCategory());
        foundProducts.setPublisher(newProduct.getPublisher());
        foundProducts.setPublishing_year(newProduct.getPublishing_year());
        foundProducts.setPrice(newProduct.getPrice());
        foundProducts.setPages(newProduct.getPages());

        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Cập nhật thông tin sản phẩm thành công!", repository.save(foundProducts))
        );
    }

    @DeleteMapping("/{id}")
    ResponseEntity<ResponseObject> deleteProduct(@PathVariable Long id) {
        try{
            Product foundProducts = repository.findById(id).orElse(null);
            if (foundProducts == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("Failed", "Sản phẩm không tồn tại!", "")
                );
            }
            repository.deleteById(foundProducts.getId());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Xoá sản phẩm thành công!", "")
            );
        }
        catch(Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("Failed", "Đã xảy ra lỗi, không thể xoá sản phẩm!", "")
            );
        }
    }

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String name) {
        return repository.findByProductNameContaining(name);
    }
}

