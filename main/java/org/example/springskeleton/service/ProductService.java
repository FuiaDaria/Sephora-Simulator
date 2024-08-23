package org.example.springskeleton.service;

import lombok.RequiredArgsConstructor;
import org.example.springskeleton.dto.product.ProductDto;
import org.example.springskeleton.dto.product.ProductRequestDto;
import org.example.springskeleton.entity.product.Product;
import org.example.springskeleton.mapper.ProductMapper;
import org.example.springskeleton.repository.product.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public List<ProductDto> findAll() {
        return productMapper.entitiesToDtos(productRepository.findAll());
    }
    public ResponseEntity<ProductDto> get(Long id) {
        return productRepository.findById(id)
                .map(productMapper::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    public ProductDto create(ProductRequestDto dto) {
        return productMapper.fromEntity(productRepository.save(productMapper.requestDtoToEntity(dto)));
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    public List<ProductDto> findAllFiltered(String brand) {
        return productMapper.entitiesToDtos(productRepository.findByBrand(brand));
    }

    public ProductDto update(Long id, ProductRequestDto dto) {
        Product existingProduct = checkExistingProduct(id);

        updateProductAttributes(dto, existingProduct);

        Product updatedProduct = productRepository.save(existingProduct);
        return productMapper.fromEntity(updatedProduct);
    }

    private Product checkExistingProduct(Long id) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + id));
        return existingProduct;
    }

    private void updateProductAttributes(ProductRequestDto dto, Product existingProduct) {
        existingProduct.setName(dto.getName());
        existingProduct.setBrand(dto.getBrand());
        existingProduct.setPrice(dto.getPrice());
        existingProduct.setTotalQuantity(dto.getTotalQuantity());
    }

    public ProductDto changeName(Long id, String another) {
        Product existing = checkExistingProduct(id);

        existing.setName(another);

        Product updated = productRepository.save(existing);
        return productMapper.fromEntity(updated);
    }

    public ProductDto changeQuantity(Long id, int another) {
        Product existing = checkExistingProduct(id);

        existing.setTotalQuantity(another);

        Product updated = productRepository.save(existing);
        return productMapper.fromEntity(updated);
    }

    public void deleteMultiple(List<Long> ids) {
        productRepository.deleteAllByIdInBatch(ids);
    }
}
