package org.example.springskeleton.dto.shoppingcart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.springskeleton.entity.customer.Customer;
import org.example.springskeleton.entity.product.Product;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingCartRequestDto {
    private Long customerId;
    private Long productId;
    private int quantity;
}

