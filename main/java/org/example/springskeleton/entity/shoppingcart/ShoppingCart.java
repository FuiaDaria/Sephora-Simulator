package org.example.springskeleton.entity.shoppingcart;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.example.springskeleton.entity.customer.Customer;
import org.example.springskeleton.entity.product.Product;

@Entity
@Table()
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ShoppingCart{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}
