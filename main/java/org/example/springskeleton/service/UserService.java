package org.example.springskeleton.service;

import lombok.RequiredArgsConstructor;
import org.example.springskeleton.dto.user.UserDto;
import org.example.springskeleton.dto.user.UserRequestDto;
import org.example.springskeleton.entity.user.User;
import org.example.springskeleton.mapper.UserMapper;
import org.example.springskeleton.repository.user.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder encoder;

    public List<UserDto> findAll() {
        return userMapper.entitiesToDtos(userRepository.findAll());
    }

    public ResponseEntity<UserDto> get(Long id) {
        return userRepository.findById(id)
                .map(userMapper::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    public UserDto create(UserRequestDto dto) {
        User user = userMapper.requestDtoToEntity(dto);
        User savedUser = userRepository.save(user);
        return userMapper.fromEntity(savedUser);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public UserDto findAllFiltered(String name) {
        return userMapper.fromEntity(userRepository.findByUsername(name).get());
    }

    public UserDto update(Long id, UserRequestDto dto) {
        User existingUser = checkExistingUser(id);

        setUserAttributes(dto, existingUser);

        User updatedUser = userRepository.save(existingUser);
        return userMapper.fromEntity(updatedUser);
    }

    private void setUserAttributes(UserRequestDto dto, User existingUser) {
        existingUser.setEmail(dto.getEmail());
        existingUser.setUsername(dto.getUsername());
        existingUser.setPassword(encoder.encode(dto.getPassword()));
    }

    private User checkExistingUser(Long id) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));
        return existingUser;
    }

    public UserDto changeUsername(Long id, String another) {
        User existing = checkExistingUser(id);

        existing.setUsername(another);

        User updated = userRepository.save(existing);
        return userMapper.fromEntity(updated);
    }

    public UserDto changePassword(Long id, String another) {
        User existing = checkExistingUser(id);

        existing.setPassword(encoder.encode(another));

        User updated = userRepository.save(existing);
        return userMapper.fromEntity(updated);
    }

    public void deleteMultiple(List<Long> ids) {
        userRepository.deleteAllByIdInBatch(ids);
    }
}
