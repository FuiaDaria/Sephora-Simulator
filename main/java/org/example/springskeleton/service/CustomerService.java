package org.example.springskeleton.service;

import lombok.RequiredArgsConstructor;
import org.example.springskeleton.dto.customer.CustomerDto;
import org.example.springskeleton.dto.customer.CustomerRequestDto;
import org.example.springskeleton.entity.customer.Customer;
import org.example.springskeleton.mapper.CustomerMapper;
import org.example.springskeleton.mapper.UserMapper;
import org.example.springskeleton.repository.customer.CustomerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;
    private final UserMapper userMapper;
    public List<CustomerDto> findAll() {
        return customerMapper.entitiesToDtos(customerRepository.findAll());
    }

    public CustomerDto findByUserId(long id){
        Customer customer = customerRepository.findByUser_Id(id);
        return customerMapper.fromEntity(customer);
    }

    public ResponseEntity<CustomerDto> get(Long id) {
        return customerRepository.findById(id)
                .map(customerMapper::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    public void delete(Long id) {
        customerRepository.deleteById(id);
    }
    public CustomerDto update(Long id, CustomerRequestDto dto){
        Customer existingCustomer = checkExistingCustomer(id);

        updateCustomerAttributes(dto, existingCustomer);

        Customer updatedCustomer = customerRepository.save(existingCustomer);
        return customerMapper.fromEntity(updatedCustomer);
    }

    private void updateCustomerAttributes(CustomerRequestDto dto, Customer existingCustomer) {
        existingCustomer.setPoints(dto.getPoints());
        existingCustomer.setUser(userMapper.fromDto(dto.getUserDto()));
    }

    private Customer checkExistingCustomer(Long id) {
        Customer existingCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found with id: " + id));
        return existingCustomer;
    }

    public CustomerDto changePoints(Long id, int another) {
        Customer existing = checkExistingCustomer(id);

        existing.setPoints(another);

        Customer updated = customerRepository.save(existing);
        return customerMapper.fromEntity(updated);
    }

}
