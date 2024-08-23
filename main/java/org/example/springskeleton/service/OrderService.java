package org.example.springskeleton.service;

import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.example.springskeleton.dto.customer.CustomerDto;
import org.example.springskeleton.dto.order.CardRequestDto;
import org.example.springskeleton.dto.order.OrderDto;
import org.example.springskeleton.dto.order.OrderRequestDto;
import org.example.springskeleton.entity.order.Order;
import org.example.springskeleton.entity.shoppingcart.ShoppingCart;
import org.example.springskeleton.mapper.CustomerMapper;
import org.example.springskeleton.mapper.OrderMapper;
import org.example.springskeleton.mapper.ShoppingCartMapper;
import org.example.springskeleton.repository.customer.CustomerRepository;
import org.example.springskeleton.repository.order.OrderRepository;
import org.example.springskeleton.repository.shoppingcart.ShoppingCartRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final ShoppingCartService shoppingCartService;
    private final StripeService stripeService;
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final CustomerService customerService;
    private final OrderMapper orderMapper;
    private final CustomerMapper customerMapper;
    private final ShoppingCartMapper shoppingCartMapper;

    public List<OrderDto> findAll() {
        return orderMapper.entitiesToDtos(orderRepository.findAll());
    }

    public ResponseEntity<OrderDto> get(Long id) {
        return orderRepository.findById(id)
                .map(orderMapper::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    public OrderDto create(OrderRequestDto dto) {
        List<ShoppingCart> list = shoppingCartService.findAllFiltered(dto.getCustomerId()).stream().map(shoppingCartMapper::fromDto).collect(Collectors.toList());;
        Order order = new Order();
        float price = getPriceForShoppingCart(list);
        setOrderAttributes(dto, order, price);
        Order savedOrder = orderRepository.save(order);
        deleteAll(list);
        return orderMapper.fromEntity(savedOrder);

    }

    private void setOrderAttributes(OrderRequestDto dto, Order order, float price) {
        order.setTotalPrice(price);
        order.setCustomer(customerMapper.fromDto(customerService.get(dto.getCustomerId()).getBody()));
    }

    private void deleteAll(List<ShoppingCart> list) {
        for(ShoppingCart shoppingCart : list){
            shoppingCartService.delete(shoppingCart.getId());
        }
    }

    private float getPriceForShoppingCart(List<ShoppingCart> list) {
        float price = 0;
        for (ShoppingCart s : list) {
            price += s.getProduct().getPrice() * s.getQuantity();
        }
        return price;
    }

    public void delete(Long id) {
        orderRepository.deleteById(id);
    }

    public List<OrderDto> findAllFiltered(Long customerId) {
        return orderMapper.entitiesToDtos(orderRepository.findByCustomerId(customerId));
    }

    public void checkout(Long customerId, CardRequestDto cardRequestDto) throws StripeException {
        OrderRequestDto dto = new OrderRequestDto(customerId);
        OrderDto orderDto = create(dto);
        CustomerDto customerDto = customerService.get(customerId).getBody();
        customerDto = customerService.changePoints(customerId, (int) (customerDto.getPoints() + orderDto.getTotalPrice()/100));
        stripeService.charge(customerDto, orderDto.getTotalPrice());
    }

}
