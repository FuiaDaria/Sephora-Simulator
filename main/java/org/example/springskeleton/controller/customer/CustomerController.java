package org.example.springskeleton.controller.customer;

import lombok.RequiredArgsConstructor;
import org.example.springskeleton.dto.customer.CustomerDto;
import org.example.springskeleton.dto.customer.CustomerRequestDto;
import org.example.springskeleton.globals.SingleBodyRequestDTO;
import org.example.springskeleton.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.example.springskeleton.globals.UrlMapping.*;

@RestController
@RequestMapping(CUSTOMER)
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping
    public List<CustomerDto> findAll() {
        return customerService.findAll();
    }

    @GetMapping(ID_PART)
    public ResponseEntity<CustomerDto> get(@PathVariable Long id) {
        return customerService.get(id);
    }

    @GetMapping(BY_USER + ID_PART)
    public CustomerDto getByUserId(@PathVariable Long id){
        return customerService.findByUserId(id);
    }

    @DeleteMapping(ID_PART)
    public void delete(@PathVariable Long id) {
        customerService.delete(id);
    }

    @PutMapping(ID_PART)
    public CustomerDto update(@PathVariable Long id, @RequestBody CustomerRequestDto dto) {
        return customerService.update(id, dto);
    }

    @PatchMapping(ID_PART + CHANGE_POINTS_PART)
    public CustomerDto changePoints(@PathVariable Long id, @RequestBody SingleBodyRequestDTO<String> dto) {
        return customerService.changePoints(id, Integer.parseInt(dto.getBody()));
    }
}
