package org.example.springskeleton.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.springskeleton.dto.review.ReviewDto;
import org.example.springskeleton.dto.review.ReviewRequestDto;
import org.example.springskeleton.entity.customer.Customer;
import org.example.springskeleton.entity.product.Product;
import org.example.springskeleton.entity.review.Review;
import org.example.springskeleton.mapper.ReviewMapper;
import org.example.springskeleton.repository.customer.CustomerRepository;
import org.example.springskeleton.repository.product.ProductRepository;
import org.example.springskeleton.repository.review.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;

    public List<ReviewDto> findAll() {
        return reviewMapper.entitiesToDtos(reviewRepository.findAll());
    }
    public ResponseEntity<ReviewDto> get(Long id) {
        return reviewRepository.findById(id)
                .map(reviewMapper::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    public ReviewDto create(ReviewRequestDto dto) {
        Product product = checkExistingProduct(dto);
        Customer customer = checkExistingManager(dto);
        Review review = setReviewAttributes(dto, product, customer);
        Review savedReview = reviewRepository.save(review);
        return reviewMapper.fromEntity(savedReview);
    }

    private static Review setReviewAttributes(ReviewRequestDto dto, Product product, Customer customer) {
        Review review = new Review();
        review.setDescription(dto.getDescription());
        review.setProduct(product);
        review.setCustomer(customer);
        return review;
    }

    private Customer checkExistingManager(ReviewRequestDto dto) {
        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
        return customer;
    }

    private Product checkExistingProduct(ReviewRequestDto dto) {
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));
        return product;
    }

    public void delete(Long id) {
        reviewRepository.deleteById(id);
    }

    public List<ReviewDto> findAllFiltered(Long productId) {
        return reviewMapper.entitiesToDtos(reviewRepository.findByProductId(productId));
    }

    public ReviewDto update(Long id, ReviewRequestDto dto) {
        Review existingReview = checkExistingReview(id);

        existingReview.setDescription(dto.getDescription());

        Review updatedReview = reviewRepository.save(existingReview);
        return reviewMapper.fromEntity(updatedReview);
    }

    private Review checkExistingReview(Long id) {
        Review existingReview = reviewRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Review not found with id: " + id));
        return existingReview;
    }

    public ReviewDto changeDescription(Long id, String another) {
        Review existing = checkExistingReview(id);

        existing.setDescription(another);

        Review updated = reviewRepository.save(existing);
        return reviewMapper.fromEntity(updated);
    }

    public void deleteMultiple(List<Long> ids) {
        reviewRepository.deleteAllByIdInBatch(ids);
    }
}
