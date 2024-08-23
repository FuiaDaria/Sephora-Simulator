package org.example.springskeleton.service;

import lombok.RequiredArgsConstructor;
import org.example.springskeleton.dto.manager.ManagerDto;
import org.example.springskeleton.dto.manager.ManagerRequestDto;
import org.example.springskeleton.entity.manager.Manager;
import org.example.springskeleton.mapper.ManagerMapper;
import org.example.springskeleton.mapper.UserMapper;
import org.example.springskeleton.repository.manager.ManagerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ManagerService {

    private final ManagerRepository managerRepository;
    private final ManagerMapper managerMapper;
    private final UserMapper userMapper;

    public List<ManagerDto> findAll() {
        return managerMapper.entitiesToDtos(managerRepository.findAll());
    }

    public ResponseEntity<ManagerDto> get(Long id) {
        return managerRepository.findById(id)
                .map(managerMapper::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    public void delete(Long id) {
        managerRepository.deleteById(id);
    }

    public ManagerDto findByUserId(long id){
        Manager manager = managerRepository.findByUser_Id(id);
        return managerMapper.fromEntity(manager);
    }
    public ManagerDto update(Long id, ManagerRequestDto dto){
        Manager existingManager = checkExistingManager(id);

        updateManagerAttributes(dto, existingManager);

        Manager updatedManager = managerRepository.save(existingManager);
        return managerMapper.fromEntity(updatedManager);
    }

    private void updateManagerAttributes(ManagerRequestDto dto, Manager existingManager) {
        existingManager.setSalary(dto.getSalary());
        existingManager.setUser(userMapper.fromDto(dto.getUserDto()));
    }

    private Manager checkExistingManager(Long id) {
        Manager existingManager = managerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("manager not found with id: " + id));
        return existingManager;
    }

    public ManagerDto changeSalary(Long id, int another) {
        Manager existingManager = checkExistingManager(id);

        existingManager.setSalary(another);

        Manager updated = managerRepository.save(existingManager);
        return managerMapper.fromEntity(updated);
    }

}
