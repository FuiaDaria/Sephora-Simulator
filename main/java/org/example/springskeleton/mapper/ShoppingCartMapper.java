package org.example.springskeleton.mapper;

import org.example.springskeleton.dto.shoppingcart.ShoppingCartDto;
import org.example.springskeleton.dto.shoppingcart.ShoppingCartRequestDto;
import org.example.springskeleton.entity.shoppingcart.ShoppingCart;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {CustomerMapper.class, ProductMapper.class})
public interface ShoppingCartMapper {
    @Mapping(source = "customer", target = "customerDto")
    @Mapping(source = "product", target = "productDto")

    ShoppingCartDto fromEntity(ShoppingCart shoppingCart);

    @Mapping(source = "customerDto", target = "customer")
    @Mapping(source = "productDto", target = "product")
    ShoppingCart fromDto(ShoppingCartDto shoppingCartDto);

    ShoppingCartRequestDto entityToRequestDTO(ShoppingCart shoppingCart);
    ShoppingCart requestDtoToEntity(ShoppingCartRequestDto shoppingCartRequestDto);
    List<ShoppingCartDto> entitiesToDtos(List<ShoppingCart> list);
}
