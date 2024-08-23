package org.example.springskeleton.mapper;

import org.example.springskeleton.dto.user.UserDto;
import org.example.springskeleton.dto.user.UserRequestDto;
import org.example.springskeleton.entity.user.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto fromEntity(User user);

    User fromDto(UserDto userDto);

    UserRequestDto entityToRequestDTO(User user);
    User requestDtoToEntity(UserRequestDto productRequestDto);
    List<UserDto> entitiesToDtos(List<User> list);
}
