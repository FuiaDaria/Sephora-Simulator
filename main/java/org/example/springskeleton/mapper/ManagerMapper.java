package org.example.springskeleton.mapper;

import org.example.springskeleton.dto.manager.ManagerDto;
import org.example.springskeleton.dto.manager.ManagerRequestDto;
import org.example.springskeleton.entity.manager.Manager;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ManagerMapper {
    @Mapping(source = "user", target = "userDto")
    ManagerDto fromEntity(Manager manager);

    @Mapping(source = "userDto", target = "user")
    Manager fromDto(ManagerDto managerDto);

    ManagerRequestDto entityToRequestDTO(Manager manager);
    Manager requestDtoToEntity(ManagerRequestDto managerRequestDto);
    List<ManagerDto> entitiesToDtos(List<Manager> list);
}
