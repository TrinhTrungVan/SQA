package com.sqa.N20.N20.database;

import com.sqa.N20.N20.models.Product;
import com.sqa.N20.N20.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
// Chứa các Bean Method, các method này được gọi ngay khi ứng dụng chạy
// Được dùng để khởi tạo các biến môi trường, ...
public class Database {

//    @Bean
//    CommandLineRunner initDatabase(ProductRepository productRepository){ // Tạo Database trước sau đó insert record
//        return new CommandLineRunner() {
//            @Override
//            public void run(String... args) throws Exception {
//                Product product1 = new Product("SP001", "Nhà giả kim", "Paulo Coelho", "NXB", 1988, "Phiêu lưu", 142000, 225);
//                Product product2 = new Product("SP002", "Nhà giả kim", "Paulo Coelho", "NXB", 1988, "Phiêu lưu", 142000, 225);
//                System.out.println("Inserted data: " + productRepository.save(product1));
//                System.out.println("Inserted data: " + productRepository.save(product2));
//            }
//        };
//    };

}
