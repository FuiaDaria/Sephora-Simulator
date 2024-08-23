package org.example.springskeleton.mapper;


import org.example.springskeleton.dto.customer.CustomerDto;
import org.example.springskeleton.dto.customer.CustomerRequestDto;
import org.example.springskeleton.entity.customer.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface CustomerMapper {
    @Mapping(source = "user", target = "userDto")
    CustomerDto fromEntity(Customer customer);

    @Mapping(source = "userDto", target = "user")
    Customer fromDto(CustomerDto customerDto);

    CustomerRequestDto entityToRequestDTO(Customer customer);
    Customer requestDtoToEntity(CustomerRequestDto customerRequestDto);
    List<CustomerDto> entitiesToDtos(List<Customer> dto);
}
