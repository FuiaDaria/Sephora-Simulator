package org.example.springskeleton.controller.order;

import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.example.springskeleton.dto.order.CardRequestDto;
import org.example.springskeleton.dto.order.OrderDto;
import org.example.springskeleton.dto.order.OrderRequestDto;
import org.example.springskeleton.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.example.springskeleton.globals.UrlMapping.*;
import static org.example.springskeleton.globals.UrlMapping.ID_PART;

@RestController
@RequestMapping(ORDER)
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @GetMapping
    public List<OrderDto> findAll() {
        return orderService.findAll();
    }

    @GetMapping(FILTERED_PART + CUSTOMERID_PART)
    public List<OrderDto> findAllFiltered(@PathVariable Long customerId) {
        return orderService.findAllFiltered(customerId);
    }

    @GetMapping(ID_PART)
    public ResponseEntity<OrderDto> get(@PathVariable Long id) {
        return orderService.get(id);
    }

    @PostMapping
    public OrderDto create(@RequestBody OrderRequestDto dto) {
        return orderService.create(dto);
    }

    @DeleteMapping(ID_PART)
    public void delete(@PathVariable Long id) {
        orderService.delete(id);
    }

    @PostMapping(CHECKOUT + ID_PART)
    public void checkout(@PathVariable Long id, @RequestBody CardRequestDto dto) throws StripeException {
        orderService.checkout(id, dto);
    }
}
