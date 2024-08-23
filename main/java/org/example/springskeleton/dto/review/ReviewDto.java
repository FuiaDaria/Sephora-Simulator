package org.example.springskeleton.dto.review;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.springskeleton.dto.customer.CustomerDto;
import org.example.springskeleton.dto.product.ProductDto;
import org.example.springskeleton.dto.user.UserDto;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {
    private Long id;
    private CustomerDto customerDto;
    private ProductDto productDto;
    private String description;
}