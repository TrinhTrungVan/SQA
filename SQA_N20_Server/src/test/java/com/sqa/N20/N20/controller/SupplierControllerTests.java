package com.sqa.N20.N20.controller;

import com.sqa.N20.N20.controllers.ProductController;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import com.sqa.N20.N20.controllers.SupplierController;
import com.sqa.N20.N20.models.Product;
import com.sqa.N20.N20.models.ResponseObject;
import com.sqa.N20.N20.models.Supplier;
import com.sqa.N20.N20.repositories.ProductRepository;
import com.sqa.N20.N20.repositories.SupplierRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.*;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.when;

@SpringBootTest
public class SupplierControllerTests {
    @InjectMocks
    private SupplierController controller;

    @Mock
    SupplierRepository repository;

    //Test lấy toàn bộ nhà cung cap
    @Test
    public void testGetAllSuppliers() {
        // mock repository
        Supplier supplier1 = new Supplier(1L,"CT01" , "Công ty 01", "Hà Nội", "1234567");
        Supplier supplier2 = new Supplier(2L,"CT02" , "Công ty 02", "Hà Nội", "1234567");
        List<Supplier> supplierList = new ArrayList<Supplier>();
        supplierList.add(supplier1);
        supplierList.add(supplier2);
        when(repository.findAll()).thenReturn(supplierList);

        // call service method
        List<Supplier> result = controller.getAllSuppliers();

        // assert result
        assertEquals(result.size(),2);
        assertThat(result.get(0)).isEqualTo(supplier1);
        assertThat(result.get(1)).isEqualTo(supplier2);
    }

    //Test lấy nhà cung cấp theo id thành công
    @Test
    void getSuppliersById_ReturnsSupplier() {
        // Arrange
        Long id = 1L;
        Supplier supplier = new Supplier(1L,"CT01" , "Công ty 01", "Hà Nội", "1234567");
        Optional<Supplier> optionalSupplier = Optional.of(supplier);

        when(repository.findById(id)).thenReturn(Optional.of(supplier));

        // Act
        ResponseEntity<ResponseObject> response = controller.getProductById(id);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("OK", response.getBody().getStatus());
        assertEquals("Query nhà cung cấp thành công", response.getBody().getMessage());
        assertEquals(optionalSupplier, response.getBody().getData());
    }

    //Test lấy nhà cung cấp theo id không tìm thấy
    @Test
    void getSuppliersById_ReturnsNotFound() {
        Long id = 2L;
        when(repository.findById(id)).thenReturn(Optional.empty());

        ResponseEntity<ResponseObject> response = controller.getProductById(id);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Failed", response.getBody().getStatus());
        assertEquals("Không thể tìm thấy nhà cung cấp với id = " + id, response.getBody().getMessage());
    }

    //Test thêm mới nhà cung cấp thành công
    @Test
    void testCreateSupplier_Success() {
        // Arrange
        Supplier newSupplier = new Supplier(1L,"CT01" , "Công ty 01", "Hà Nội", "1234567");

        when(repository.findBySupplierCode(newSupplier.getSupplierCode().trim())).thenReturn(null);
        when(repository.save(newSupplier)).thenReturn(newSupplier);

        // Act
        ResponseEntity<ResponseObject> response = controller.createProduct(newSupplier);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("OK", response.getBody().getStatus());
        assertEquals("Add supplier successfully", response.getBody().getMessage());
        assertEquals(newSupplier, response.getBody().getData());
    }

    //Test thêm mới nhà cung cấp thất bại do đã tồn tại nhà cung cấp
    @Test
    void testCreateSupplier_fail() {
        // Arrange
        Supplier newSupplier = new Supplier(1L,"CT01" , "Công ty 01", "Hà Nội", "1234567");

        Supplier foundSupplier = new Supplier(1L,"CT01" , "Công ty 01", "Hà Nội", "1234567");


        when(repository.findBySupplierCode(newSupplier.getSupplierCode().trim())).thenReturn(foundSupplier);

        // Act
        ResponseEntity<ResponseObject> response = controller.createProduct(newSupplier);

        // Assert
        assertEquals(HttpStatus.NOT_IMPLEMENTED, response.getStatusCode());
        assertEquals("Failed", response.getBody().getStatus());
        assertEquals("SupplierCode đã tồn tại", response.getBody().getMessage());
        assertEquals("", response.getBody().getData());
    }

    //Câp nhật thông tin thành công
    @Test
    public void testUpdateSupplier_Success() {
        // Given
        Supplier foundSupplier = new Supplier(1L,"CT01" , "Công ty 01", "Hà Nội", "1234567");

        Supplier newSupplier = new Supplier(1L,"CT02" , "Công ty 02", "Hải Dương", "1234567");;

        when(repository.findById(foundSupplier.getId())).thenReturn(Optional.of(foundSupplier));
        when(repository.findBySupplierCode(newSupplier.getSupplierCode().trim())).thenReturn(null);
        when(repository.save(foundSupplier)).thenReturn(foundSupplier);

        // When
        ResponseEntity<ResponseObject> responseEntity = controller.updateSupplier(newSupplier, foundSupplier.getId());

        // Then
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        ResponseObject responseObject = responseEntity.getBody();
        assertEquals("OK", responseObject.getStatus());
        assertEquals("Cập nhật thông tin nhà cung cấp thành công!", responseObject.getMessage());
        assertEquals(foundSupplier, responseObject.getData());
    }

    //Cập nhật thông tin tất bại do không tìm thấy nhà cung cấp
    @Test
    public void testUpdateSupplier_NotFound() {
        // Given
        Supplier newSupplier = new Supplier (1L,"CT01" , "Công ty 01", "Hà Nội", "1234567");


        when(repository.findById(1L)).thenReturn(Optional.empty());

        // When
        ResponseEntity<ResponseObject> responseEntity = controller.updateSupplier(newSupplier, 1L);

        // Then
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        ResponseObject responseObject = responseEntity.getBody();
        assertEquals("Failed", responseObject.getStatus());
        assertEquals("Nhà cung cấp không tồn tại!", responseObject.getMessage());
    }

    //Cập nhật thong tin tất bại do nhà cung cấp đã tồn tại
    @Test
    public void testUpdateSupplier_SupplierCodeExists() {
        // Given
        Long supplierId = 1L;
        Supplier newSupplier = new Supplier(1L,"CT01" , "Công ty 01", "Hà Nội", "1234567");

        Supplier existingSupplier = new Supplier(1L,"CT02" , "Công ty 02", "Hải Dương", "1234567");;

        when(repository.findById(supplierId)).thenReturn(Optional.of(existingSupplier));
        when(repository.findBySupplierCode(newSupplier.getSupplierCode().trim())).thenReturn(existingSupplier);

        // When
        ResponseEntity<ResponseObject> responseEntity = controller.updateSupplier(newSupplier, supplierId);

        // Then
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        ResponseObject responseObject = responseEntity.getBody();
        assertEquals("Failed", responseObject.getStatus());
        assertEquals("SupplierCode đã tồn tại!", responseObject.getMessage());
    }

    //Test xoá nhà cung cấp theo id thành công
    @Test
    public void deleteSupplier_existingId_success() {
        // Given
        Long id = 1L;
        Supplier existingSupplier = new Supplier(1L,"CT01" , "Công ty 01", "Hà Nội", "1234567");

        when(repository.findById(id)).thenReturn(Optional.of(existingSupplier));

        // When
        ResponseEntity<ResponseObject> response = controller.deleteSupplier(id);

        // Then
        verify(repository, times(1)).deleteById(id);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("OK", response.getBody().getStatus());
        assertEquals("Xoá nhà cung cấp thành công!", response.getBody().getMessage());
    }

    //Test xoá nhà cung cấp theo Id thất bại do không tồn tại nhà cung cấp
    @Test
    public void deleteSupplier_nonExistingId_notFound() {
        // Given
        Long id = 1L;

        when(repository.findById(id)).thenReturn(Optional.empty());

        // When
        ResponseEntity<ResponseObject> response = controller.deleteSupplier(id);

        // Then
        verify(repository, never()).deleteById(any());
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Failed", response.getBody().getStatus());
        assertEquals("Nhà cung cấp không tồn tại!", response.getBody().getMessage());
    }

    //Xoá nhà cung cấp xảy ra ngoại lệ
    @Test
    public void deleteSupplier_exceptionThrown_notFound() {
        // Given
        Long id = 1L;

        when(repository.findById(id)).thenThrow(new RuntimeException());

        // When
        ResponseEntity<ResponseObject> response = controller.deleteSupplier(id);

        // Then
        verify(repository, never()).deleteById(any());
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Failed", response.getBody().getStatus());
        assertEquals("Đã xảy ra lỗi, không thể xoá nhà cung cấp!", response.getBody().getMessage());
    }

    //Tìm kiếm nhà phân phối có tên chứa keyword
    @Test
    public void searchSuppliers_matchingName_success() {
        // Given
        String searchName = "ABC";
        Supplier supplier1 = new Supplier();
        supplier1.setId(1L);
        supplier1.setSupplierName("ABC Corporation");
        Supplier supplier2 = new Supplier();
        supplier2.setId(2L);
        supplier2.setSupplierName("XYZ ABC Corp");
        List<Supplier> expectedSuppliers = Arrays.asList(supplier1, supplier2);

        when(repository.findBySupplierNameContaining(searchName)).thenReturn(expectedSuppliers);

        // When
        List<Supplier> actualSuppliers = controller.searchSuppliers(searchName);

        // Then
        assertEquals(expectedSuppliers, actualSuppliers);
    }

    //Tìm kiếm nhà cung cấp trả về rỗng
    @Test
    public void searchSuppliers_nonMatchingName_emptyList() {
        // Given
        String searchName = "ABC";
        List<Supplier> expectedSuppliers = Arrays.asList();

        when(repository.findBySupplierNameContaining(searchName)).thenReturn(expectedSuppliers);

        // When
        List<Supplier> actualSuppliers = controller.searchSuppliers(searchName);

        // Then
        assertEquals(expectedSuppliers, actualSuppliers);
    }
}


