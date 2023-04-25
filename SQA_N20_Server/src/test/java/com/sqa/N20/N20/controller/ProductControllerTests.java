package com.sqa.N20.N20.controller;

import com.sqa.N20.N20.controllers.ProductController;
import com.sqa.N20.N20.models.Product;
import com.sqa.N20.N20.models.ResponseObject;
import com.sqa.N20.N20.repositories.ProductRepository;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
public class ProductControllerTests {

    @InjectMocks
    private ProductController controller;


    @Mock
    ProductRepository repository;

    //Test lấy toàn bộ sản pham thành công
    @Test
    public void testGetAllProducts_Success() {
        // Tạo dữ liệu mô phỏng kết quả trả về
        List<Product> productList = new ArrayList<>();
        productList.add(new Product(1L, "SP01", "Sách giáo khoa","Tô Hoài","Kim Đồng",0,"Truyện",1200,200));
        productList.add(new Product(2L, "SP02", "Sách văn học","Ngô Tất Tố","NXB Trẻ",0,"Truyện",800,100));
        productList.add(new Product(3L, "SP03", "Sách thiếu nhi","Kim Đồng","Kim Đồng",0,"Truyện",500,50));

        // giả lập dữ liệu trả về khi gọi findAll()
        when(repository.findAll()).thenReturn(productList);

        // gọi hàm getAllProducts
        List<Product> result = controller.getAllProducts();

        // Kiểm tra xem findAll đã được chạy qua 1 lần
        Mockito.verify(repository, Mockito.times(1)).findAll();

        // So sánh kết quả với dữ liệu mô phỏng
        Assert.assertEquals(productList, result);
    }

    //Test lấy sản phẩm theo Id trả về kết quả
    @Test
    public void getProductByIdTests_Success() {
        //Mô phỏng dữ liệu trả ve
        // Given
        Long id = 1L;
        Product product = new Product(id, "SP01", "Sách giáo khoa","Tô Hoài","Kim Đồng",0,"Truyện",1200,200);
        Optional<Product> optionalProduct = Optional.of(product);

        //Giả lập dữ liệu trả về khi gọi findById
        when(repository.findById(id)).thenReturn(Optional.of(product));

        //Gọi hàm getproductById
        // When
        ResponseEntity<ResponseObject> response = controller.getProductById(id);
        ResponseObject responseObject = response.getBody();

        // Kiểm tra xem findAll đã được chạy qua 1 lần
        Mockito.verify(repository, Mockito.times(1)).findById(id);

        //So sánh kết quả
        // Then
        assertNotNull(responseObject);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("OK", responseObject.getStatus());
        assertEquals("Query thành công!", responseObject.getMessage());
        assertEquals(optionalProduct, responseObject.getData());
    }

    //Test lấy sản phẩm theo Id không tìm thấy sản phẩm
    @Test
    public void testGetProductById_NotFound() {
        // Given
        Long id = 2L;

        when(repository.findById(id)).thenReturn(Optional.empty());

        // When
        ResponseEntity<ResponseObject> response = controller.getProductById(id);
        ResponseObject responseObject = response.getBody();

        // Then
        assertNotNull(responseObject);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Failed", responseObject.getStatus());
        assertEquals("Không tìm thấy sản phẩm với id = " + id, responseObject.getMessage());
    }

    //Test tạo sản phẩm thành công
    @Test
    public void testCreateProduct_Success() {
        // Tạo sản phâm mới để thêm
        Product newProduct = new Product(1L, "SP01", "Sách giáo khoa","Tô Hoài","Kim Đồng",0,"Truyện",1200,200);

        // Giả sử SP01 chưa tồn tại (findByProductCode = null)
        when(repository.findByProductCode("SP01")).thenReturn(null);

        // Giả lập dữ liệu khi save()
        when(repository.save(newProduct)).thenReturn(newProduct);

        // Gọi hàm createProduct()
        ResponseEntity<ResponseObject> result = controller.createProduct(newProduct);

        // Kiem tra các hàm được chạy qua 1 lần
        Mockito.verify(repository, Mockito.times(1)).findByProductCode("SP01");
        Mockito.verify(repository, Mockito.times(1)).save(newProduct);

        //giả lập kết quả kì vọng
        ResponseObject expectedResponse = new ResponseObject("OK", "Thêm sản phẩm thành công!", newProduct);

        // So sánh kết quả
        Assert.assertEquals(expectedResponse.getData(), result.getBody().getData());
        Assert.assertEquals(HttpStatus.OK, result.getStatusCode());
    }

    //Test tạo sản phẩm thất bại do sản phâm đã tồn tại
    @Test
    public void testCreateProduct_Failure() {
        // Tạo sản phâm mới để thêm
        Product newProduct = new Product(1L, "SP01", "Sách giáo khoa","Tô Hoài","Kim Đồng",0,"Truyện",1200,200);

        // Giả sử sản phẩm SP01 đã tồn tại
        when(repository.findByProductCode("SP01")).thenReturn(newProduct);

        // Gọi hàm createProduct()
        ResponseEntity<ResponseObject> result = controller.createProduct(newProduct);

        // Kiem tra các hàm được chạy qua 1 lần
        Mockito.verify(repository, Mockito.times(1)).findByProductCode("SP01");

        //Giả sử kết quả kì vọng
        ResponseObject expectedResponse = new ResponseObject("Failed", "ProductCode đã tồn tại!", "");

        // So sánh kết quả
        Assert.assertEquals(expectedResponse.getData(), result.getBody().getData());
        Assert.assertEquals(HttpStatus.NOT_IMPLEMENTED, result.getStatusCode());
    }

    //Test cập nhật thông tin san phẩm thành công
    @Test
    public void testUpdateProduct_Success() {
        // tạo data giả lập
        //dữ liệu sản phẩm truoc khi sửa
        Product product = new Product(1L, "SP01", "Sách giáo khoa","Tô Hoài","Kim Đồng",0,"Truyện",1200,200);
        //dữ liệu sản phẩm sau khi sửa
        Product newProduct = new Product(1L, "SP02", "Sách bài tập","Việt","Kim Đồng",0,"Truyện",1200,200);

        // tạo kiểu dữ liệu trả về khi gọi hàm
        Mockito.when(repository.findById(1L)).thenReturn(Optional.of(product));
        Mockito.when(repository.save(product)).thenReturn(product);

        // gọi hàm UpdateProduct trả về kết quả thực tế
        ResponseEntity<ResponseObject> response = controller.updateProduct(newProduct, 1L);

        // So sánh kết quả thực tế với kết qua kì vọng
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("OK", response.getBody().getStatus());
        assertEquals("Cập nhật thông tin sản phẩm thành công!", response.getBody().getMessage());
        assertEquals(product, response.getBody().getData());

        // kiểm tra các phương thức đuoc chạy qua 1 lần
        Mockito.verify(repository, Mockito.times(1)).findById(1L);
        Mockito.verify(repository, Mockito.times(1)).save(product);
    }

    //Test cập nhật sản phẩm thất bại do thông tin mới trùng với sản phẩm đã tồn tại
    @Test
    public void testUpdateProduct_Failure() {
        // tạo data giả lập
        //dữ liệu sản phẩm truoc khi sửa
        Product product = new Product(1L, "SP01", "Sách giáo khoa","Tô Hoài","Kim Đồng",0,"Truyện",1200,200);
        //dữ liệu sản phẩm sau khi sửa
        Product newProduct = new Product(1L, "SP02", "Sách bài tập","Việt","Kim Đồng",0,"Truyện",1200,200);


        // tạo kiểu dữ liệu trả về khi gọi hàm
        Mockito.when(repository.findById(1L)).thenReturn(Optional.of(product));
        Mockito.when(repository.findByProductCode("SP02")).thenReturn(product);

        // gọi hàm UpdateProduct trả về kết quả thực tế
        ResponseEntity<ResponseObject> response = controller.updateProduct(newProduct, 1L);

        // So sánh kết quả thực tế với kết qua kì vọng
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Failed", response.getBody().getStatus());
        assertEquals("ProductCode đã tồn tại!", response.getBody().getMessage());
        assertEquals("", response.getBody().getData());

        // kiểm tra các phương thức đuoc chạy qua 1 lần và không chạy phương thức save
        Mockito.verify(repository, Mockito.times(1)).findById(1L);
        Mockito.verify(repository, Mockito.times(1)).findByProductCode("SP02");
        Mockito.verify(repository, Mockito.never()).save(product);
    }

    //Test cập nhật thông tin thất bại do sản phẩm muốn sửa không tồn tại
    @Test
    public void testUpdateProductNotFound() {
        // Giả lập dữ liệu
        Product newProduct = new Product(1L, "SP01", "Sách giáo khoa","Tô Hoài","Kim Đồng",0,"Truyện",1200,200);

        // giả sử dữ liệu trả về khi findById
        Mockito.when(repository.findById(1L)).thenReturn(Optional.empty());

        // gọi phương thức updateProduct trả về kết qủa thực tế
        ResponseEntity<ResponseObject> response = controller.updateProduct(newProduct, 1L);

        // So sánh kết quả
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Failed", response.getBody().getStatus());
        assertEquals("Sản phẩm không tồn tại!", response.getBody().getMessage());
        assertEquals("", response.getBody().getData());

        // kiểm tra các phương thức đã chạy và chưa chạy
        Mockito.verify(repository, Mockito.times(1)).findById(1L);
        Mockito.verify(repository, Mockito.never()).findByProductCode(Mockito.anyString());
        Mockito.verify(repository, Mockito.never()).save(Mockito.any(Product.class));
    }

    //Xoá sản phẩm thành công
    @Test
    public void testDeleteProduct_Success() {
        // Arrange
        //Tạo dữ liệu đầu ra kì vọng
        Long id = 1L;
        Product foundProduct = new Product(1L, "SP01", "Sách giáo khoa","Tô Hoài","Kim Đồng",0,"Truyện",1200,200);
        //giả sử dữ sản phẩm có tồn tại
        Mockito.when(repository.findById(id)).thenReturn(Optional.of(foundProduct));

        // Act
        //gọi hàm deleteProduct trả về dữ liệu thực tế
        ResponseEntity<ResponseObject> response = controller.deleteProduct(id);

        // Assert
        //So sánh dữ liệu
        Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assert.assertEquals("OK", response.getBody().getStatus());
        Assert.assertEquals("Xoá sản phẩm thành công!", response.getBody().getMessage());
    }

    //Xoá sản phẩm thất bại do sản phẩm không tồn tại
    @Test
    public void testDeleteProduct_ProductNotFound() {
        // Arrange
        Long id = 1L;
        //giả sử dữ liệu không tôn tại
        Mockito.when(repository.findById(id)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<ResponseObject> response = controller.deleteProduct(id);

        // Assert
        Assert.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        Assert.assertEquals("Failed", response.getBody().getStatus());
        Assert.assertEquals("Sản phẩm không tồn tại!", response.getBody().getMessage());
    }

    //Xoá sản phẩm thất bại do xảy ra ngoại lệ
    @Test
    public void testDeleteProduct_Exception() {
        // Arrange
        Long id = 1L;
        //Giả sử findById bắt ngoại lệ RuntimeException
        Mockito.when(repository.findById(id)).thenThrow(new RuntimeException());

        // Act
        ResponseEntity<ResponseObject> response = controller.deleteProduct(id);

        // Assert
        Assert.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        Assert.assertEquals("Failed", response.getBody().getStatus());
        Assert.assertEquals("Đã xảy ra lỗi, không thể xoá sản phẩm!", response.getBody().getMessage());
    }

    //Test tìm kiếm sản phẩm thành công
    @Test
    public void testSearchProducts_Success() {
        // Arrange
        String name = "Product 1";
        List<Product> foundProducts = new ArrayList<>();
        foundProducts.add(new Product(1L, "SP01", name,"Tô Hoài","Kim Đồng",0,"Truyện",1200,200));
        Mockito.when(repository.findByProductNameContaining(name)).thenReturn(foundProducts);

        // Act
        List<Product> result = controller.searchProducts(name);

        // Assert
        Assert.assertEquals(1, result.size());
        Assert.assertEquals(name, result.get(0).getProductName());
    }

    //Test tìm kiếm sản phẩm không có kết quả thoả mãn
    @Test
    public void testSearchProducts_NoResult() {
        // Arrange
        String name = "Product 2";
        Mockito.when(repository.findByProductNameContaining(name)).thenReturn(Collections.emptyList());

        // Act
        List<Product> result = controller.searchProducts(name);

        // Assert
        Assert.assertEquals(0, result.size());
    }
}
