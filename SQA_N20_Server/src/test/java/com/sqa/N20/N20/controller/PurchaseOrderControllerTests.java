package com.sqa.N20.N20.controller;

import com.sqa.N20.N20.controllers.ProductController;
import com.sqa.N20.N20.controllers.PurchaseOrderController;
import com.sqa.N20.N20.models.*;
import com.sqa.N20.N20.repositories.ProductRepository;
import com.sqa.N20.N20.repositories.PurchaseOrderRepository;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
public class PurchaseOrderControllerTests {
    @InjectMocks
    private PurchaseOrderController controller;


    @Mock
    PurchaseOrderRepository repository;

    //Test lấy toàn bộ quản lý đơn nhập hàng thành công
    @Test
    public void testGetAllPurchaseOrder_Success() {
        // Tạo dữ liệu mô phỏng kết quả trả về
        List<PurchaseOrder> purchaseList = new ArrayList<>();

        PurchaseOrder po1 = new PurchaseOrder();
        po1.setId(1L);
        po1.setPurchaseCode("DN01");

        PurchaseOrder po2 = new PurchaseOrder();
        po2.setId(2L);
        po2.setPurchaseCode("DN02");

        purchaseList.add(po1);
        purchaseList.add(po2);

        // giả lập dữ liệu trả về khi gọi findAll()
        when(repository.findAll()).thenReturn(purchaseList);

        // gọi hàm getAllProducts
        List<PurchaseOrder> result = controller.getAllPurchaseOrders();

        // Kiểm tra xem findAll đã được chạy qua 1 lần
        Mockito.verify(repository, Mockito.times(1)).findAll();

        // So sánh kết quả với dữ liệu mô phỏng
        Assert.assertEquals(purchaseList, result);
    }

    //Test thêm mới don nhập hàng thất bại do đơn nhập đã tô tại
    @Test
    public void createPurchaseOrdersTest_fail(){
        // Arrange
        //po muốn thêm mới
        PurchaseOrder po1 = new PurchaseOrder();
        po1.setId(1L);
        po1.setPurchaseCode("DN01");

        //po đã tồn tại
        PurchaseOrder po2 = new PurchaseOrder();
        po2.setId(2L);
        po2.setPurchaseCode("DN02");


        when(repository.findByPurchaseCode(po1.getPurchaseCode().trim())).thenReturn(po2);

        // Act
        ResponseEntity<ResponseObject> response = controller.createPurchaseOrders(po1);

        // Assert
        assertEquals(HttpStatus.NOT_IMPLEMENTED, response.getStatusCode());
        assertEquals("Failed", response.getBody().getStatus());
        assertEquals("PurchaseCode đã tồn tại!", response.getBody().getMessage());
        assertEquals("", response.getBody().getData());
    }

    @Test
    public void testUpdateSupplier_Success() {
        // Given
        //po muốn thêm mới
        PurchaseOrder po1 = new PurchaseOrder();
        po1.setId(1L);
        po1.setPurchaseCode("DN01");

        //po đã tồn tại
        PurchaseOrder po2 = new PurchaseOrder();
        po2.setId(2L);
        po2.setPurchaseCode("DN02");

        when(repository.findById(po1.getId())).thenReturn(Optional.of(po1));
        when(repository.findByPurchaseCode(po1.getPurchaseCode().trim())).thenReturn(null);
        when(repository.save(po1)).thenReturn(po1);

        // When
        ResponseEntity<ResponseObject> responseEntity = controller.createPurchaseOrders(po1);

        // Then
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        ResponseObject responseObject = responseEntity.getBody();
        assertEquals("OK", responseObject.getStatus());
        assertEquals("Create product successfully", responseObject.getMessage());
        assertEquals(po1, responseObject.getData());
    }
}
