package org.example.springskeleton.repository.shoppingcart;

import org.example.springskeleton.entity.shoppingcart.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {

    List<ShoppingCart> findByCustomerId(Long customerId);
}
