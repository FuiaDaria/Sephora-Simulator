package org.example.springskeleton.controller.user;

import lombok.RequiredArgsConstructor;
import org.example.springskeleton.dto.user.UserDto;
import org.example.springskeleton.dto.user.UserRequestDto;
import org.example.springskeleton.entity.user.User;
import org.example.springskeleton.globals.SingleBodyRequestDTO;
import org.example.springskeleton.service.CustomerService;
import org.example.springskeleton.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.example.springskeleton.globals.UrlMapping.*;

@RestController
@RequestMapping(USER)
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserDto> findAll() {
        return userService.findAll();
    }

    @GetMapping(FILTERED_PART + USERNAME_PART)
    public UserDto findAllFiltered(@PathVariable String username) {
        return userService.findAllFiltered(username);
    }

    @GetMapping(ID_PART)
    public ResponseEntity<UserDto> get(@PathVariable Long id) {
        return userService.get(id);
    }

    @PostMapping
    public UserDto create(@RequestBody UserRequestDto dto) {

        return userService.create(dto);
    }

    @DeleteMapping(ID_PART)
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }

    @DeleteMapping
    public void deleteMultiple(@RequestParam List<Long> ids) {
        userService.deleteMultiple(ids);
    }

    @PutMapping(ID_PART)
    public UserDto update(@PathVariable Long id, @RequestBody UserRequestDto dto) {
        return userService.update(id, dto);
    }

    @PatchMapping(ID_PART + CHANGE_USERNAME_PART)
    public UserDto changeUsername(@PathVariable Long id, @RequestBody SingleBodyRequestDTO<String> dto) {
        return userService.changeUsername(id, dto.getBody());
    }

    @PatchMapping(ID_PART + CHANGE_PASSWORD_PART)
    public UserDto changePassword(@PathVariable Long id, @RequestBody SingleBodyRequestDTO<String> dto) {
        return userService.changePassword(id, dto.getBody());
    }
}
