package org.example.springskeleton.controller.product;

import lombok.RequiredArgsConstructor;
import org.example.springskeleton.dto.product.ProductDto;
import org.example.springskeleton.dto.product.ProductRequestDto;
import org.example.springskeleton.entity.product.Product;
import org.example.springskeleton.globals.SingleBodyRequestDTO;
import org.example.springskeleton.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.example.springskeleton.globals.UrlMapping.*;

@RestController
@RequestMapping(PRODUCT)
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public List<ProductDto> findAll() {
        return productService.findAll();
    }

    @GetMapping(FILTERED_PART + BRAND_PART)
    public List<ProductDto> findAllFiltered(@PathVariable String brand) {
        return productService.findAllFiltered(brand);
    }

    @GetMapping(ID_PART)
    public ResponseEntity<ProductDto> get(@PathVariable Long id) {
        return productService.get(id);
    }

    @PostMapping
    public ProductDto create(@RequestBody ProductRequestDto dto) {
        return productService.create(dto);
    }

    @DeleteMapping(ID_PART)
    public void delete(@PathVariable Long id) {
        productService.delete(id);
    }

    @DeleteMapping
    public void deleteMultiple(@RequestParam List<Long> ids) {
        productService.deleteMultiple(ids);
    }

    @PutMapping(ID_PART)
    public ProductDto update(@PathVariable Long id, @RequestBody ProductRequestDto dto) {
        return productService.update(id, dto);
    }

    @PatchMapping(ID_PART + CHANGE_NAME_PART)
    public ProductDto changeName(@PathVariable Long id, @RequestBody SingleBodyRequestDTO<String> dto) {
        return productService.changeName(id, dto.getBody());
    }

    @PatchMapping(ID_PART + CHANGE_QUANTITY_PART)
    public ProductDto changeQuantity(@PathVariable Long id, @RequestBody SingleBodyRequestDTO<String> dto) {
        return productService.changeQuantity(id, Integer.parseInt(dto.getBody()));
    }
}
