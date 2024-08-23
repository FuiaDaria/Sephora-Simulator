package org.example.springskeleton.dto.shoppingcart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.springskeleton.dto.customer.CustomerDto;
import org.example.springskeleton.dto.product.ProductDto;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingCartDto {
    private Long id;
    private CustomerDto customerDto;
    private ProductDto productDto;
    private int quantity;
}