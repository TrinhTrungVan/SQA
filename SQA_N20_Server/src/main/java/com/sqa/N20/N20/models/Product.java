package com.sqa.N20.N20.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Auto-increment
    private Long id;
    private String productCode;
    private String productName;
    private String author;
    private String publisher;
    private int publishing_year;
    private String category;
    private int price;
    private int pages;

    public Product() {
    }

//    public Product(String productCode, String productName, String author, String publisher, int publishing_year, String category, long price, int pages) {
//        this.productCode = productCode;
//        this.productName = productName;
//        this.author = author;
//        this.publisher = publisher;
//        this.publishing_year = publishing_year;
//        this.category = category;
//        this.price = price;
//        this.pages = pages;
//    }

    public Product(Long id, String productCode, String productName, String author, String publisher, int publishing_year, String category, int price, int pages) {
        this.id = id;
        this.productCode = productCode;
        this.productName = productName;
        this.author = author;
        this.publisher = publisher;
        this.publishing_year = publishing_year;
        this.category = category;
        this.price = price;
        this.pages = pages;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public int getPublishing_year() {
        return publishing_year;
    }

    public void setPublishing_year(int publishing_year) {
        this.publishing_year = publishing_year;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getPages() {
        return pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", productCode='" + productCode + '\'' +
                ", productName='" + productName + '\'' +
                ", author='" + author + '\'' +
                ", publisher='" + publisher + '\'' +
                ", publishing_year=" + publishing_year +
                ", category='" + category + '\'' +
                ", price=" + price +
                ", pages=" + pages +
                '}';
    }
}
