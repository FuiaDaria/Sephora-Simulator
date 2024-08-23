package org.example.springskeleton.service;

import lombok.RequiredArgsConstructor;
import org.example.springskeleton.dto.shoppingcart.ShoppingCartDto;
import org.example.springskeleton.dto.shoppingcart.ShoppingCartRequestDto;
import org.example.springskeleton.entity.customer.Customer;
import org.example.springskeleton.entity.product.Product;
import org.example.springskeleton.entity.review.Review;
import org.example.springskeleton.entity.shoppingcart.ShoppingCart;
import org.example.springskeleton.mapper.ShoppingCartMapper;
import org.example.springskeleton.repository.customer.CustomerRepository;
import org.example.springskeleton.repository.product.ProductRepository;
import org.example.springskeleton.repository.shoppingcart.ShoppingCartRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShoppingCartService {

    private final ShoppingCartRepository shoppingCartRepository;
    private final ShoppingCartMapper shoppingCartMapper;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;

    public List<ShoppingCartDto> findAll() {
        return shoppingCartMapper.entitiesToDtos(shoppingCartRepository.findAll());
    }

    public ResponseEntity<ShoppingCartDto> get(Long id) {
        return shoppingCartRepository.findById(id)
                .map(shoppingCartMapper::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    public ShoppingCartDto create(ShoppingCartRequestDto dto) {
        Product product = checkExistingProduct(dto);
        Customer customer = customerRepository.findByUser_Id(dto.getCustomerId());
        ShoppingCart shoppingCart = setCartAttributes(dto, product, customer);
        ShoppingCart savedShoppingCart = shoppingCartRepository.save(shoppingCart);
        return shoppingCartMapper.fromEntity(savedShoppingCart);
    }

    private static ShoppingCart setCartAttributes(ShoppingCartRequestDto dto, Product product, Customer customer) {
        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.setQuantity(dto.getQuantity());
        shoppingCart.setProduct(product);
        shoppingCart.setCustomer(customer);
        return shoppingCart;
    }

    private Product checkExistingProduct(ShoppingCartRequestDto dto) {
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));
        return product;
    }

    public void delete(Long id) {
        shoppingCartRepository.deleteById(id);
    }

    public List<ShoppingCartDto> findAllFiltered(Long customerId) {
        return shoppingCartMapper.entitiesToDtos(shoppingCartRepository.findByCustomerId(customerId));
    }

    public ShoppingCartDto update(Long id, ShoppingCartRequestDto dto) {
        ShoppingCart existingShoppingCart = checkExistingCart(id);

        existingShoppingCart.setQuantity(dto.getQuantity());

        ShoppingCart updatedShoppingCart = shoppingCartRepository.save(existingShoppingCart);
        return shoppingCartMapper.fromEntity(updatedShoppingCart);
    }

    private ShoppingCart checkExistingCart(Long id) {
        ShoppingCart existingShoppingCart = shoppingCartRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ShoppingCart not found with id: " + id));
        return existingShoppingCart;
    }

    public ShoppingCartDto changeQuantity(Long id, int another) {
        ShoppingCart existing = checkExistingCart(id);

        existing.setQuantity(another);

        ShoppingCart updated = shoppingCartRepository.save(existing);
        return shoppingCartMapper.fromEntity(updated);
    }

    public void deleteMultiple(List<Long> ids) {
        shoppingCartRepository.deleteAllByIdInBatch(ids);
    }
}
