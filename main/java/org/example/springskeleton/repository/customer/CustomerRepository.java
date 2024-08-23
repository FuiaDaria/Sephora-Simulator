package org.example.springskeleton.repository.customer;


import org.example.springskeleton.dto.customer.CustomerDto;
import org.example.springskeleton.entity.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByUser_Id(long id);
}

