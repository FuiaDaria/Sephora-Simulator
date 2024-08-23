package org.example.springskeleton.mapper;

import org.example.springskeleton.dto.product.ProductDto;
import org.example.springskeleton.dto.product.ProductRequestDto;
import org.example.springskeleton.entity.product.Product;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    ProductDto fromEntity(Product product);

    Product fromDto(ProductDto productDto);

    ProductRequestDto entityToRequestDTO(Product product);
    Product requestDtoToEntity(ProductRequestDto productRequestDto);
    List<ProductDto> entitiesToDtos(List<Product> list);
}
