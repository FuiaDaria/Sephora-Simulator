package org.example.springskeleton.entity.order;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.example.springskeleton.entity.customer.Customer;
import org.example.springskeleton.entity.review.Review;
import org.example.springskeleton.entity.shoppingcart.ShoppingCart;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "purchase_order")
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private float totalPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

}
