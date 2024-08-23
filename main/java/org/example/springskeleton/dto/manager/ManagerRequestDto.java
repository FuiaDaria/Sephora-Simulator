package org.example.springskeleton.dto.manager;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.springskeleton.dto.user.UserDto;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ManagerRequestDto {
    private int salary;
    private UserDto userDto;
}

