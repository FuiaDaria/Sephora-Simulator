package org.example.springskeleton.controller.manager;

import lombok.RequiredArgsConstructor;
import org.example.springskeleton.dto.manager.ManagerDto;
import org.example.springskeleton.dto.manager.ManagerRequestDto;
import org.example.springskeleton.globals.SingleBodyRequestDTO;
import org.example.springskeleton.service.ManagerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.example.springskeleton.globals.UrlMapping.*;

@RestController
@RequestMapping(MANAGER)
@RequiredArgsConstructor
public class ManagerController {

    private final ManagerService managerService;

    @GetMapping
    public List<ManagerDto> findAll() {
        return managerService.findAll();
    }

    @GetMapping(ID_PART)
    public ResponseEntity<ManagerDto> get(@PathVariable Long id) {
        return managerService.get(id);
    }
    @GetMapping(BY_USER + ID_PART)
    public ManagerDto getByUserId(@PathVariable Long id){
        return managerService.findByUserId(id);
    }

    @DeleteMapping(ID_PART)
    public void delete(@PathVariable Long id) {
        managerService.delete(id);
    }

    @PutMapping(ID_PART)
    public ManagerDto update(@PathVariable Long id, @RequestBody ManagerRequestDto dto) {
        return managerService.update(id, dto);
    }

    @PatchMapping(ID_PART + CHANGE_SALARY_PART)
    public ManagerDto changeSalary(@PathVariable Long id, @RequestBody SingleBodyRequestDTO<String> dto) {
        return managerService.changeSalary(id, Integer.parseInt(dto.getBody()));
    }
}
