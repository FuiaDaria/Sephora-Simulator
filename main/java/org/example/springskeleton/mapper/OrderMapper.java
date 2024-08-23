package org.example.springskeleton.mapper;

import org.example.springskeleton.dto.order.OrderDto;
import org.example.springskeleton.dto.order.OrderRequestDto;
import org.example.springskeleton.entity.order.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {CustomerMapper.class, ShoppingCartMapper.class})
public interface OrderMapper {
    @Mapping(source = "customer", target = "customerDto")
    OrderDto fromEntity(Order order);

    @Mapping(source = "customerDto", target = "customer")
    Order fromDto(OrderDto orderDto);

    OrderRequestDto entityToRequestDTO(Order order);
    Order requestDtoToEntity(OrderRequestDto orderRequestDto);
    List<OrderDto> entitiesToDtos(List<Order> list);
}
